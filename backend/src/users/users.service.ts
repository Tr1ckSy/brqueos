import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
}

@Injectable()
export class UsersService {
  // In-memory users storage (replace with database in production)
  private users: User[] = [
    {
      id: 1,
      email: 'admin@briqueos.com',
      // Password: admin123
      password: '$2a$10$Qjm5yDhGKjvqkXGpLGzPpOzJxSvNPv1N6VvJHxlG6nGTwVxq0gUGK',
      name: 'Administrador',
      role: 'admin',
      createdAt: new Date(),
    },
    {
      id: 2,
      email: 'usuario@briqueos.com',
      // Password: user123
      password: '$2a$10$Qjm5yDhGKjvqkXGpLGzPpOzJxSvNPv1N6VvJHxlG6nGTwVxq0gUGK',
      name: 'Usuario Teste',
      role: 'user',
      createdAt: new Date(),
    },
  ];

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async create(email: string, password: string, name: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: this.users.length + 1,
      email,
      password: hashedPassword,
      name,
      role: 'user',
      createdAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
