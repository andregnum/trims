import { Injectable } from '@nestjs/common';
import { User, Prisma } from '../../../generated/prisma/client.js';
import {
  FindUsersOptions,
  IUserRepository,
  UserQuery,
} from '../interface/user-repository.interface.js';
import { CreateUserDto, UpdateUserDto } from '../dto/index.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  // create
  async create(
    createUserDto: CreateUserDto,
  ): Promise<Prisma.UserGetPayload<{ include: { userProfile: true } }>> {
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
        phoneNumber: createUserDto.phoneNumber,
        isActive: createUserDto.isActive,
        userProfile: {
          create: {
            name: createUserDto.name,
            displayName: createUserDto.displayName,
            photoUrl: createUserDto.photoUrl,
          },
        },
      },
      include: { userProfile: true },
    });

    return user;
  }

  // Read - Single
  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findOne(query: UserQuery): Promise<User | null> {
    const where = this.buildWhereClause(query);
    return this.prisma.user.findFirst({
      where,
    });
  }

  // Read - Multiple
  async findAll(options?: FindUsersOptions): Promise<User[]> {
    return this.prisma.user.findMany({
      skip: options?.skip,
      take: options?.take,
      orderBy: options?.orderBy,
    });
  }

  async findMany(
    query: UserQuery,
    options?: FindUsersOptions,
  ): Promise<User[]> {
    const where = this.buildWhereClause(query);
    return this.prisma.user.findMany({
      where,
      skip: options?.skip,
      take: options?.take,
      orderBy: options?.orderBy,
    });
  }

  // Read - dengan pagination
  async findWithPagination(
    query: UserQuery,
    page: number = 1,
    limit: number = 10,
  ) {
    const where = this.buildWhereClause(query);
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Update
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async partialUpdate(id: string, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // Delete
  async delete(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async softDelete(id: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  // Utility
  async exists(query: UserQuery): Promise<boolean> {
    const where = this.buildWhereClause(query);
    const count = await this.prisma.user.count({ where });
    return count > 0;
  }

  async count(query?: UserQuery): Promise<number> {
    const where = query ? this.buildWhereClause(query) : undefined;
    return this.prisma.user.count({ where });
  }

  // Helper method untuk build WHERE clause
  private buildWhereClause(query: UserQuery): Prisma.UserWhereInput {
    const where: Prisma.UserWhereInput = {};

    if (query.id) where.id = query.id;
    if (query.email) where.email = query.email;
    if (query.ids) where.id = { in: query.ids };
    if (query.isActive !== undefined) where.isActive = query.isActive;
    if (query.createdAt) {
      where.createdAt = {};
      if (query.createdAt.gte) where.createdAt.gte = query.createdAt.gte;
      if (query.createdAt.lte) where.createdAt.lte = query.createdAt.lte;
    }

    return where;
  }
}
