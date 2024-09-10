import { MainTag } from "@/components/atoms";
import SharedFilePage from "./_components/shared-file-page";
import { TopSection } from "@/components/molecules";

/**
 * The page for the route /shared/me/[doc_id]
 */
function PrivatelySharedDynamicRoutePage() {
  return (
    <MainTag className="justify-start">
      <TopSection hide_search_section />

      <SharedFilePage isPublicFilePage={false} />
    </MainTag>
  );
}

/**
 * The page for the route /shared/pub/[doc_id]
 */
function PubliclySharedDynamicRoutePage() {
  return (
    <MainTag className="justify-start">
      <TopSection hide_search_section />

      <SharedFilePage isPublicFilePage />
    </MainTag>
  );
}

export { PrivatelySharedDynamicRoutePage, PubliclySharedDynamicRoutePage };
