import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignUpRequestDto } from './dto/signup-request.dto';
import { SignUpResponseDto } from './dto/signup-response.dto';
import { User } from 'src/entities/user.entity';

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

    // behind scene this method "create" instance new object from SignUpRequestDto class
    // User user = new User();
    // // dto gotten from params of method it's like "userDto"
    // // since "userDto" is a class so before we pass object to method as params , we instance this
    // // object frist from class userDto and we pass it to service "cretaeuSerService(user dtoUser)"
    // user.setName(dto.getName())
    // user.setEmail(dto.getEmail())
    // user.setAge(dto.getAge())
    //

    const createdUser = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return this.usersRepository.save(createdUser);
  }

  async signup(dto: SignUpRequestDto): Promise<SignUpResponseDto> {
    const { name, email, password } = dto;
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const user = await this.create(dto);
    return new SignUpResponseDto(user);
  }
}
