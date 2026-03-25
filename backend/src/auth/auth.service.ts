import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService, User } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

export interface JwtPayload {
  sub: number;
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    
    const { password: _, ...result } = user;
    return result;
  }

  async login(user: Omit<User, 'password'>): Promise<AuthResponse> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }
    
    const user = await this.usersService.create(email, password, name);
    const { password: _, ...userWithoutPassword } = user;
    return this.login(userWithoutPassword);
  }

  async getProfile(userId: number): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const { password: _, ...result } = user;
    return result;
  }
}
