// data-source.ts
import { DataSource } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { User } from './entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'M.ysql@123',
  database: 'blog_db',
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
