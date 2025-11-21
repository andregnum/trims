import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  Inject,
  Logger,
} from '@nestjs/common';
import type {
  FindUsersOptions,
  IUserRepository,
  UserQuery,
} from './interface/user-repository.interface.js';
import { CreateUserDto, UpdateUserDto } from './dto/index.js';
import { User } from '../../generated/prisma/client.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
  ) {}

  // === CREATE OPERATIONS ===
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findByEmail(
        createUserDto.email,
      );
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

      const user = await this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });

      this.logger.log(`User created successfully: ${user.email}`);
      return user;
    } catch (error: unknown) {
      if (error instanceof ConflictException) {
        throw error;
      }

      // Handle bcrypt errors
      if (error instanceof Error && error.message.includes('bcrypt')) {
        this.logger.error('Password hashing failed', error.stack);
        throw new BadRequestException('Invalid password format');
      }

      // Handle unexpected errors
      this.logger.error(
        'Failed to create user',
        error instanceof Error ? error.stack : error,
      );
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  // === READ OPERATIONS - SINGLE ===
  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findOne(query: UserQuery): Promise<User> {
    const user = await this.userRepository.findOne(query);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // === READ OPERATIONS - MULTIPLE ===
  async findAll(options?: FindUsersOptions): Promise<User[]> {
    return this.userRepository.findAll(options);
  }

  async findMany(
    query: UserQuery,
    options?: FindUsersOptions,
  ): Promise<User[]> {
    return this.userRepository.findMany(query, options);
  }

  async findWithPagination(
    query: UserQuery,
    page: number = 1,
    limit: number = 10,
  ) {
    return this.userRepository.findWithPagination(query, page, limit);
  }

  // === UPDATE OPERATIONS ===
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Check if user exists
    await this.findById(id);

    // If email is being updated, check for duplicates
    if (updateUserDto.email) {
      const existingUser = await this.userRepository.findByEmail(
        updateUserDto.email,
      );
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email already in use');
      }
    }

    // Hash password if it's being updated
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 12);
    }

    return this.userRepository.update(id, updateUserDto);
  }

  async partialUpdate(id: string, data: Partial<User>): Promise<User> {
    await this.findById(id);
    return this.userRepository.partialUpdate(id, data);
  }

  // === DELETE OPERATIONS ===
  async delete(id: string): Promise<User> {
    await this.findById(id);
    return this.userRepository.delete(id);
  }

  async softDelete(id: string): Promise<User> {
    await this.findById(id);
    return this.userRepository.softDelete(id);
  }

  // === UTILITY METHODS ===
  async exists(query: UserQuery): Promise<boolean> {
    return this.userRepository.exists(query);
  }

  async count(query?: UserQuery): Promise<number> {
    return this.userRepository.count(query);
  }

  // === BUSINESS LOGIC METHODS ===
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async activateUser(id: string): Promise<User> {
    return this.partialUpdate(id, { isActive: true });
  }

  async deactivateUser(id: string): Promise<User> {
    return this.partialUpdate(id, { isActive: false });
  }
}
