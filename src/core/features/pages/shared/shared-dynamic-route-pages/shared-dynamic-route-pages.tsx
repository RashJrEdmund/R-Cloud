import SharedFilePage from "./_components/shared-file-page";

/**
 * The page for the route /shared/me/[doc_id]
 */
function PrivatelySharedDynamicRoutePage() {
  return <SharedFilePage isPublicFilePage={false} />;
}

/**
 * The page for the route /shared/pub/[doc_id]
 */
function PubliclySharedDynamicRoutePage() {
  return <SharedFilePage isPublicFilePage />;
}

export { PrivatelySharedDynamicRoutePage, PubliclySharedDynamicRoutePage };
