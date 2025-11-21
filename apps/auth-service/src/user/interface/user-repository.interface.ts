import { CreateUserDto, UpdateUserDto } from '../dto/index.js';
import { User } from '../../../generated/prisma/client.js';

export interface UserQuery {
  id?: string;
  email?: string;
  emailVerifiedAt?: Date;
  ids?: string[];
  isActive?: boolean;
  createdAt?: {
    gte: Date;
    lte: Date;
  };
  updatedAt?: {
    gte: Date;
    lte: Date;
  };
}

export interface FindUsersOptions {
  skip?: number;
  take?: number;
  orderBy?: {
    [key: string]: 'asc' | 'desc';
  };
}

export interface IUserRepository {
  // create
  create(createUserDto: CreateUserDto): Promise<User>;

  // read - single
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findOne(query: UserQuery): Promise<User | null>;

  // read - multiple
  findAll(options?: FindUsersOptions): Promise<User[]>;
  findMany(query: UserQuery, options?: FindUsersOptions): Promise<User[]>;

  // read - pagination
  findWithPagination(
    query: UserQuery,
    page: number,
    limit: number,
  ): Promise<{
    users: User[];
    total: number;
    page: number;
    totalPages: number;
  }>;

  // update
  update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
  partialUpdate(id: string, data: Partial<User>): Promise<User>;

  // delete
  delete(id: string): Promise<User>;
  softDelete(id: string): Promise<User>;

  // utility
  exists(query: UserQuery): Promise<boolean>;
  count(query?: UserQuery): Promise<number>;
}
