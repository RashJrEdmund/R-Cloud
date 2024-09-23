"use client";

import type { SharedDocument, User } from "@/core/interfaces/entities";

import { loadUserSharedFiles } from "@/core/config/firebase/fire-store";
import { useQuery } from "@tanstack/react-query";

const useLoadUserSharedFiles = (currentUser: User | null) => {
  return useQuery({
    queryKey: ["shared-with-me"],
    queryFn: () => loadUserSharedFiles(currentUser!.email).then(res => {
      if (res.empty) return [];

      const docs = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      const data: Record<string, SharedDocument[]> = {};

      docs.forEach(({ shared_by, ...restDoc }) => {
        if (data[shared_by]) data[shared_by].push({ shared_by, ...restDoc });
        else data[shared_by] = [{ shared_by, ...restDoc }];
      });

      // console.log("page data", Object.entries(data));
      return Object.entries(data);
    }),
  });
};

export { useLoadUserSharedFiles };
