import {
  createUserProfile,
  getOneStoragePlan,
} from "@/core/config/firebase/fire-store";

import type { UserProfile } from "@/core/interfaces/entities";
import type { User } from "firebase/auth";

type IHandleCreateUserProfile = (
  user: User | undefined,
  extra_data: { [key: string]: string } | null,
  set_state_actions: {
    setFormStatus: React.Dispatch<
      React.SetStateAction<{ status: number; message: string } | null>
    >;
  }
) => Promise<void>;

const handleCreateUserProfile: IHandleCreateUserProfile = async (
  user,
  extra_data,
  { setFormStatus }
) => {
  /* FUNC_DESC +=> ===========================================
  | This functions is meant to setup user accounts for newly |
  | signed up users                                          |
  ================================================//========*/

  const res = await getOneStoragePlan("0"); // 0 is Id of default storage plan;

  if (!res.exists()) return;

  setFormStatus({
    status: 200,
    message: "Account created, setting up user profile...",
  });

  const plan = res.data();

  const userProfile: UserProfile = {
    id: user?.uid || "",
    email: user?.email || "",
    date_of_birth: extra_data?.date_of_birth || "",
    phone_number: "", // extra_data?.phone_number, // TODO +=> ADD phone_number: extra_data
    role: "USER",
    plan: {
      id: res.id,
      ...plan,
      used_bytes: 0,
    },
  };

  await createUserProfile(userProfile);

  setFormStatus({
    status: 200,
    message: `welcome to r-cloud, ${user?.displayName || user?.email?.split("@").shift() || "new user"}`,
  });
};

export { handleCreateUserProfile };
