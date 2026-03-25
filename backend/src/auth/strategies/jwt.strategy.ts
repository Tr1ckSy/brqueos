import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'briqueos-jwt-secret-key-2024',
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload) {
      throw new UnauthorizedException();
    }
    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    };
  }
}
