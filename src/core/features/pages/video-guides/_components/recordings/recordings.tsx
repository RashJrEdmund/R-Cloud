import type { RecordingData } from "./types";

import { Suspense } from "react";
import { RecordingShimmer, RecordingsCard } from "./recording-cards";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const DemoData: RecordingData[] = [
  {
    heading: "Get Authenticated",
    source: "/recordings/get-authenticated.webm",
  },
  {
    heading: "Update Profile",
    source: "/recordings/update-profile.webm",
  },
  {
    heading: "Organize & Save Files",
    source: "/recordings/organize-files.webm",
  },
  {
    heading: "Change Document Layouts",
    source: "/recordings/layout-shift.webm",
  },
  {
    heading: "View and Download Files",
    source: "/recordings/view-and-download-files.webm",
  },
  {
    heading: "Modify and Delete Files",
    source: "/recordings/modify-and-delete-files.webm",
  },
  {
    heading: "Share Files and set View Permissions",
    source: "/recordings/share-files.webm",
  },
  {
    heading: "Create Achieves from Folders",
    source: "/recordings/r-cloud-get-authenticated-recording.webm",
    comingSoon: true,
  },
  {
    heading: "Buy and Use New Subscriptions",
    source: "/recordings/r-cloud-get-authenticated-recording.webm",
    comingSoon: true,
  },
];

async function RecordingsDisplay() {
  return (
    <Carousel className="w-full">
      <CarouselContent className="w-fit sm:p-[10px]">
        {DemoData.map(({ heading, source, comingSoon }, i, arr) => (
          <CarouselItem
            key={heading}
            className={i + 1 === arr.length ? "sm:mr-[10px]" : ""}
          >
            <RecordingsCard
              data={{
                heading: `${heading} - (${i + 1}/${arr.length})`,
                source,
                comingSoon,
              }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default function Recordings() {
  return (
    <div className="flex w-primary_app_w items-center justify-center">
      <Suspense fallback={<RecordingShimmer />}>
        <RecordingsDisplay />
      </Suspense>
    </div>
  );
}
