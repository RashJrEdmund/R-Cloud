import type { UserProfile } from "@/core/interfaces/entities";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "@/core/config/firebase/fire-store";

const useUpdateUserProfile = (profile: UserProfile) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["users", profile.id],
    mutationFn: updateUserProfile,
    onMutate: async (update) => {
      const {
        email,
        updates: { role },
      } = update;
      // optimistic updates
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const prevUsers = queryClient.getQueryData([
        "dashboard",
        "users",
      ]) as UserProfile[];

      queryClient.setQueryData(["dashboard", "users"], () =>
        prevUsers.map((user) => {
          if (user.email !== email) return user;

          // optimistically update user
          return { ...user, role };
        })
      );

      return { prevUsers };
    },
    onError: (err, updateUser, context) => {
      // rolling-back logic if function fails;
      queryClient.setQueryData(["dashboard", "users"], context?.prevUsers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard", "users"] });
    },
  });
};

export { useUpdateUserProfile };
