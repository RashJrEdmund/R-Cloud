import type { UserRoles } from "@/core/interfaces/entities";
import { useUserStore } from "@/providers/stores/zustand";

export default function useRights(roles: UserRoles[]) {
  const { userProfile } = useUserStore();

  if (!userProfile) return false;

  return roles.includes(userProfile?.role);
}
