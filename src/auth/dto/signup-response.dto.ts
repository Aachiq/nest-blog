import { User } from 'src/entities/user.entity';

export class SignUpResponseDto {
  id: string;
  name: string;
  email: string;
  token: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    // this.token = user.token;
  }
}
