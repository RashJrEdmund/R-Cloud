import type { UserProfile } from "@/core/interfaces/entities";

import { getUserProfile } from "@/core/config/firebase/fire-store";
import { useUserStore } from "@/providers/stores/zustand";
import { useQuery } from "@tanstack/react-query";

const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: () => {
      const {
        currentUser,
        setUserProfile,
        setUserProfileLoading
      } = useUserStore.getState(); // zustand allows for this

      setUserProfileLoading(true);

      if (!currentUser) {
        setUserProfileLoading(false);
        return null;
      };

      return getUserProfile(currentUser!.email).then(res => {
        const profile = { ...res.data(), id: res.id } as UserProfile;

        setUserProfile(profile);
        setUserProfileLoading(false);

        return profile;
      });
    }
  });
};

export {
  useGetUserProfile,
};
