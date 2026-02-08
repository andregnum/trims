import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

@Injectable()
export class AuthService {
  constructor(private readonly logger: Logger) {}

  async login(creadentials: {
    username: string;
    password: string;
  }): Promise<string> {
    this.logger.log(`User ${creadentials.username} is attempting to log in.`);
    // Implement login logic here

    this.logger.log(`User ${creadentials.username} logged in successfully.`);
    return Promise.resolve('fake-jwt-token');
  }

  async validateUser(token: string): Promise<boolean> {
    this.logger.log(`Validating token: ${token}`);
    // Implement token validation logic here

    const isValid = token === 'fake-jwt-token';
    this.logger.log(`Token validation result: ${isValid}`);
    return Promise.resolve(isValid);
  }
}
