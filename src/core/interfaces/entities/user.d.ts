import type { StoragePlan } from "./storage-plans";

const Roles = {
  USER: "USER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
} as const;

type UserRoles = keyof typeof Roles;

interface User {
  id: string;
  email: string;
  username: string;
  displayName?: string;
  date_of_birth: Date | string;
  phone_number: string;
  photo_url: string;
  accessToken: string;
  metadata: {
    createdAt: Date | string;
    creationTime: Date | string;
    lastLoginAt: Date | string;
    lastSignInTime: Date | string;
  };
}

interface UserPlan extends StoragePlan {
  used_bytes: number;
}

interface UserProfile {
  id: string;
  email: string;
  date_of_birth: Date | string;
  role: UserRoles;
  phone_number: string;
  plan: UserPlan;
}

export { Roles };

export type { UserRoles, User, UserPlan, UserProfile };
