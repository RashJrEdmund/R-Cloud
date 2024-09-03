import type { Document, SharedDocument } from "@/core/interfaces/entities";

export default function Viewer({
  fileInView,
}: {
  fileInView: Document | SharedDocument;
}) {
  if (fileInView?.content_type?.includes("video")) {
    return (
      <video controls className="max-h-full w-fit max-w-[90%]">
        <source src={fileInView.download_url || ""} />
        your browser does not support videos
      </video>
    );
  }

  if (fileInView?.content_type?.includes("audio")) {
    return (
      <audio controls className="w-full max-w-[min(90%,_500px)]">
        <source
          src={fileInView.download_url || ""}
          type={fileInView.content_type}
        />
        Your browser does not support the audio tag.
      </audio>
    );
  }

  if (fileInView?.content_type?.includes("image")) {
    return (
      <img
        width="100"
        height="100"
        // quality={100}
        alt={"image for " + fileInView?.name}
        src={fileInView?.download_url || ""}
        // objectFit='contain'
        // placeholder='blur'
        // style={{
        //   maxHeight: "90vh",
        //   minWidth: "min(90vw, 1000px)",
        //   display: "flex",
        //   alignItems: "center",
        //   justifyContent: "center",
        //   objectFit: "contain",
        // }}
        className="max-h-full w-fit max-w-[min(90%,_1000px)]"
      />
    );
  }

  return (
    <embed
      width="100%"
      height="100%"
      // type={fileInView?.content_type || undefined} // this is for when using <object /> tag
      src={fileInView?.download_url || ""}
      className="h-full max-h-full"
    />
  );
}
