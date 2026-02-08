import { PrismaExceptionFilter } from './prisma-exception.filter.js';

describe('FilterFilter', () => {
  it('should be defined', () => {
    expect(new PrismaExceptionFilter()).toBeDefined();
  });
});
