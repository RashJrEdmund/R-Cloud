/* FILE_DESC +=> =============================
| Implemented document logic for users here. |
|, i.e documents and collections.            |
================================//========= */

import { setDoc, getDoc, getDocs, deleteDoc, addDoc } from "firebase/firestore";
import { createFreeCollectionPath, createFreeDocPath, createUserCollectionPath, createUserDocPath } from "./utils";

import type { UserProfile } from "@/core/interfaces/entities";
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

(async () => {
  const usersCollection = createFreeCollectionPath<{}>("/users");

  const users = (await getDocs(usersCollection)).docs.map((doc) => ({ email: doc.id }));

  console.clear();

  for (const { email } of users) {
    const userProfile = (await getUserProfile(email)).data()!;

    const user_doc_path = createFreeDocPath(["users", email]);

    const date_subscribed = new Date().toISOString();

    await setDoc(
      user_doc_path,
      { ...userProfile, plan: { ...userProfile.plan, date_subscribed } },
      {
        merge: true,
      }
    );

    const user_doc_path_2 = createUserCollectionPath(email, "/subscriptions");

    await addDoc(
      user_doc_path_2,
      { ...userProfile.plan, date_subscribed }
    );

    console.log("done with email: ", email);
  }

  // for (const { email } of users) {
  //   const userProfile = (await getUserProfile(email)).data()!;

  //   const user_doc_path = createUserDocPath(email, "/profile/me");

  //   await deleteDoc(
  //     user_doc_path,
  //   );

  //   console.log("done with email: ", email);
  // }

  console.log({ users });
});

export {
  getUserProfile,
  createUserProfile,
  updateUsedSpace,
  updateUserAccountSettings,
};
