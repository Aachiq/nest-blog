import {
  Injectable,
  ConflictException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignUpRequestDto } from './dto/signup-request.dto';
import { SignUpResponseDto } from './dto/signup-response.dto';
import { User } from 'src/entities/user.entity';
import { SignInRequestDto } from './dto/signin-request.dto';
import { SignInResponseDto } from './dto/signin-response.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  private async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  private async create(userDto: SignUpRequestDto): Promise<User> {
    const { name, email, password } = userDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    // #########
    // behind scene this method "create" instance new object from SignUpRequestDto class
    // User user = new User(); // this calss of Entity, we instance object from Entity
    // dto gotten from create function params of method it's like "userDto" of SignUpRequestDto
    // since "userDto" of SignUpRequestDto is a class so before we pass object to function as parameters , we instance this
    // object frist from class userDto of SignUpRequestDto and we pass it to service "cretaeuSerService(user dtoUser)"
    // user.setName(dto.getName())
    // user.setEmail(dto.getEmail())
    // user.setAge(dto.getAge())
    // #########

    const createdUser = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return this.usersRepository.save(createdUser);
  }

  async signup(dto: SignUpRequestDto): Promise<SignUpResponseDto> {
    const { email } = dto;
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const user = await this.create(dto);
    // here user has type of User Record I need to extract password & add token
    // to match SignUpResponseDto
    const createdUserResponse = new SignUpResponseDto(user);
    return createdUserResponse;
  }

  async signin(dtoLogin: SignInRequestDto): Promise<SignInResponseDto> {
    const { email, password } = dtoLogin;
    const existingUser = await this.findByEmail(email);
    if (!existingUser) {
      throw new ConflictException('User Email not Exist !');
    }

    // check if password identic
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    ); // Compare passwords
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Generate JWT
    const { id, email: emailExistDb, name } = existingUser;
    const token = jwt.sign(
      { sub: id, email: emailExistDb },
      'my_secret_123',
      { expiresIn: '1d' }, // or any expiration
    );

    return new SignInResponseDto(id, name, email, token);
  }
}
