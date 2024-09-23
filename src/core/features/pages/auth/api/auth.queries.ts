import type { UserProfile } from "@/core/interfaces/entities";

import { getUserProfile } from "@/core/config/firebase/fire-store";
import { useUserStore } from "@/providers/stores/zustand";
import { useQuery } from "@tanstack/react-query";
import { _onAuthStateChange } from "@/core/config/firebase";
import { extractUserDetailsFromFirebaseAuth } from "@/providers/guards/app-wrapper/app-wrapper.service";

const useGetCurrentUser = () => {
  const {
    setCurrentUser,
    setCurrentUserLoading,
  } = useUserStore();

  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      setCurrentUserLoading(true);

      try {
        const { unsubscribe, user } = await _onAuthStateChange();

        if (user) {
          const _user = await extractUserDetailsFromFirebaseAuth(user);

          setCurrentUser(_user);
        }
      } catch (err) {
        // console.warn(err);
      } finally {
        setCurrentUserLoading(false);
      }
    }
  });
}


const useGetCurrentUserProfile = () => {
  return useQuery({
    queryKey: ["current-user-profile"],
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
  useGetCurrentUser,
  useGetCurrentUserProfile,
};
