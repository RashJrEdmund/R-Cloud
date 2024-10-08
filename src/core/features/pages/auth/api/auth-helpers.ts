import {
  createNewPlanSubscription,
  createUserProfile,
  getOneStoragePlan,
} from "@/core/config/firebase/fire-store";

import type { UserProfile } from "@/core/interfaces/entities";
import type { User } from "firebase/auth";

type HandleCreateUserProfile = (
  user: User | undefined,
  extra_data: { [key: string]: string } | null,
  set_state_actions: {
    setFormStatus: React.Dispatch<
      React.SetStateAction<{ status: number; message: string } | null>
    >;
  }
) => Promise<void>;

const handleCreateUserProfile: HandleCreateUserProfile = async (
  user,
  extra_data,
  { setFormStatus }
) => {
  /* FUNC_DESC +=> ===========================================
  | This functions is meant to setup user accounts for newly |
  | signed up users                                          |
  ================================================//========*/

  const res = await getOneStoragePlan("0"); // 0 is Id of default storage plan;

  // TODO +=> work on subscriptions, I mean add a subscriptions collection under each user/email/ and track their subscriptions

  if (!res.exists()) return;

  setFormStatus({
    status: 200,
    message: "Account created, setting up user profile...",
  });

  const plan = res.data();

  const date = new Date().toISOString();

  const userProfile: UserProfile = {
    id: user?.uid || "",
    email: user?.email || "",
    date_of_birth: extra_data?.date_of_birth || "",
    phone_number: "", // extra_data?.phone_number, // TODO +=> ADD phone_number: extra_data
    role: "USER",
    plan: {
      plan_id: res.id,
      ...plan,
      used_bytes: 0,
      date_subscribed: date,
    },
    date_created: date,
    date_updated: null,
  };

  await createUserProfile(userProfile).then(() => {
    return createNewPlanSubscription(userProfile.email, {
      ...userProfile.plan,
    }); // setting up as new subscription
  });

  setFormStatus({
    status: 200,
    message: `welcome to r-cloud, ${user?.displayName || user?.email?.split("@").shift() || "new user"}`,
  });
};

export { handleCreateUserProfile };
