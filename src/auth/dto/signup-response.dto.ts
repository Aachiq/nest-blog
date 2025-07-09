import { User } from 'src/entities/user.entity';

export class SignUpResponseDto {
  id: number;
  name: string;
  email: string;
  // token: string; // the token is used in signin not signup

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}
