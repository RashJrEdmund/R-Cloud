import type { RecordingData } from "./types";

import { DivCard, TextTag } from "@/components/atoms";
import { Suspense } from "react";
import { RecordingShimmer, RecordingsCard } from "./recording-cards";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const DemoData: RecordingData[] = [
  {
    heading: "Get Authenticated",
    source: "/recordings/r-cloud-not-signed-in-recording.webm",
  },
  {
    heading: "Update Profile",
    source: "/recordings/r-cloud-not-signed-in-recording.webm",
  },
  {
    heading: "Organize & Save Files",
    source: "/recordings/r-cloud-not-signed-in-recording.webm",
  },
  {
    heading: "Share Files and set View Permissions",
    source: "/recordings/r-cloud-not-signed-in-recording.webm",
  }
];

async function RecordingsDisplay() {
  return (
    <Carousel className="w-full">
      <CarouselContent className="sm:p-[10px] w-fit">
        {DemoData.map(({ heading, source }, i, arr) => (
          <CarouselItem
            key={heading}
            className={(i + 1) === arr.length ? "sm:mr-[10px]" : ""}
          >
            <RecordingsCard data={{ heading, source }} />
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
      <TextTag
        as="h2"
        className="font-semibold text-2xl"
      >
        Video Guides
      </TextTag>

      <Suspense fallback={<RecordingShimmer />}>
        <RecordingsDisplay />
      </Suspense>
    </DivCard>
  )
};
