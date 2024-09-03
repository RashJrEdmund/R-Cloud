/* FILE_DESC +=> =============================
| Implemented document logic for users here. |
|, i.e documents and collections.            |
================================//========= */

import { setDoc, getDoc, getDocs, deleteDoc, addDoc } from "firebase/firestore";
import {
  createFreeCollectionPath,
  createFreeDocPath,
  createUserCollectionPath,
  createUserDocPath,
} from "./utils";

import type { UserPlan, UserProfile } from "@/core/interfaces/entities";
import type { DocumentSnapshot } from "firebase/firestore";
import type { IUpdateAction } from "../interfaces";

// READ request

const getUserProfile = async (
  email: string
): Promise<DocumentSnapshot<UserProfile>> => {
  const doc_path = createFreeDocPath<UserProfile>(["users", email]);

  return getDoc(doc_path);
};

// WRITE requests

const createUserProfile = async (user: UserProfile) => {
  const doc_path = createFreeDocPath<UserProfile>(["users", user.email]);

  const { ...userData } = user;

  return setDoc(
    doc_path,
    {
      // addDoc doesn't allow customIds, setDoc does
      ...userData,
    },
    { merge: true }
  ); // so as to update if exits or create if not exits;
};

const updateUserProfile = async ({ email, updates }: {
  email: string,
  updates: Partial<UserProfile>
}) => {
  const user_document_path = createFreeDocPath<UserProfile>(["users", email]);

  return setDoc(
    user_document_path,
    {
      ...updates,
      date_updated: new Date().toISOString(),
    },
    { merge: true } // merge true so as to create if doesn't exist or only update specified fields if exits;
  );
};

const createNewPlanSubscription = async (email: string, userPlan: UserPlan) => {
  const subscription_col_path = createUserCollectionPath(
    email,
    "/subscriptions"
  );

  await addDoc(subscription_col_path, { ...userPlan });
};

const updateUsedSpace = async (
  email: string,
  used_bytes: number,
  action: IUpdateAction = "ADD"
) => {
  try {
    const profile_path = createFreeDocPath<UserProfile>(["users", email]);

    const profile = await getDoc(profile_path);

    if (!profile.exists()) {
      throw new Error("PROFILE DOES NOT EXIST");
    }

    const _profile = profile.data();

    let new_used_bytes = 0;

    if (action === "ADD") {
      new_used_bytes = Number(_profile.plan.used_bytes) + used_bytes;
    } else if (action === "SUBTRACT") {
      new_used_bytes = Number(_profile.plan.used_bytes) - used_bytes;
    } else {
      // for replace ACTION
      new_used_bytes = used_bytes;
    }

    // console.log({ _profile, new_used_bytes });

    return setDoc(
      profile_path,
      {
        plan: {
          used_bytes: new_used_bytes,
        },
      },
      { merge: true } // merge true so as to create if doesn't exist of only update specified fields if exits;
    );
  } catch (error) {
    throw error;
  }
};

const updateUserAccountSettings = async (
  email: string,
  settings: { [k: string]: string }
) => {
  const doc_path = createUserDocPath(email, "/profile/settings");

  console.log("user document created", doc_path, settings);
};

// (async () => {
//   const usersCollection = createFreeCollectionPath<{}>("/users");

//   const users = (await getDocs(usersCollection)).docs.map((doc) => ({ email: doc.id }));

//   console.clear();

//   for (const { email } of users) {
//     const userProfile = (await getUserProfile(email)).data()!;

//     const subscription_col_path = createFreeCollectionPath<UserPlan>(["users", email, "subscriptions"]);

//     const subs = await getDocs(subscription_col_path);

//     if (subs.empty) {
//       await createNewPlanSubscription(email, {
//         ...userProfile.plan,
//       });
//       console.log("empty", subs.empty, "but created his sub");
//     } else {
//       const doc = subs.docs[0];

//       console.log({
//         has_plan_id: !!doc.data().plan_id,
//         user_profile_too: !!userProfile.plan.plan_id,
//         email: userProfile.email,
//         // ...doc.data(),
//         // id: doc.id,
//       });
//     };

//     const date_subscribed = new Date().toISOString();

//     // console.log("done with email: ", email);
//   }
// });

export {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  createNewPlanSubscription,
  updateUsedSpace,
  updateUserAccountSettings,
};
