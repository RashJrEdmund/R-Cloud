import { ShimmerCache } from "@/core/lib";
import { useDocStore } from "@/providers/stores/zustand";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const shimmerCache = new ShimmerCache();

export default function useFilesFolderShimmerCache() {
  const [cardCount, setCardCount] = useState<number>(shimmerCache.defaultCacheCount); // should display 16 cards by default if current folder is not yet cached

  const pathname = usePathname();
  const params = useParams<{ folder_id: string }>();

  const { documents, currentFolder } = useDocStore();

  useEffect(() => {
    const isRoot = !params.folder_id && pathname.endsWith("/root");

    // console.log({ isRoot, doc_length: documents.length, currentFolder });

    if (isRoot) {
      shimmerCache.updateShimmerCache("root", documents.length, { update: !!documents.length });
    }

    for (const { id: folder_id, capacity: { length } } of documents.filter(({ type }) => type === "FOLDER")) {
      shimmerCache.updateShimmerCache(folder_id, length!);
    }

    setCardCount(() => {
      return isRoot ? shimmerCache.getFolderCache("root") : shimmerCache.getFolderCache(params.folder_id);
    });
  }, [documents, params, pathname, currentFolder]);

  return { cardCount };
};
