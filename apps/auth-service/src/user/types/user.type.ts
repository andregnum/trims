import { Prisma, User, UserProfile } from '../../../generated/prisma/client.js';

export type UserWithProfile = Prisma.UserGetPayload<{
  include: { userProfile: true };
}>;

export interface UserAggregate {
  user: User | undefined;
  profile: UserProfile;
}
