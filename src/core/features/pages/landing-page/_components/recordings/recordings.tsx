import type { RecordingData } from "./types";

import { DivCard, TextTag } from "@/components/atoms";
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
    source: "/recordings/r-cloud-get-authenticated-recording.webm",
  },
  {
    heading: "Update Profile",
    source: "/recordings/r-cloud-update-profile-recording.webm",
  },
  {
    heading: "Organize & Save Files",
    source: "/recordings/r-cloud-organize-files-recording.webm",
  },
  {
    heading: "View and Download Files",
    source: "/recordings/r-cloud-view-and-download-files-recording.webm",
  },
  {
    heading: "Modify and Delete Files",
    source: "/recordings/r-cloud-modify-and-delete-files-recording.webm",
  },
  {
    heading: "Share Files and set View Permissions",
    source: "/recordings/r-cloud-get-authenticated-recording.webm",
    comingSoon: true,
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
            <RecordingsCard data={{ heading, source, comingSoon }} />
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
    <DivCard className="w-primary_app_width flex-col justify-start gap-8">
      <TextTag as="h2" className="text-2xl font-semibold">
        Video Guides
      </TextTag>

      <Suspense fallback={<RecordingShimmer />}>
        <RecordingsDisplay />
      </Suspense>
    </DivCard>
  );
}
