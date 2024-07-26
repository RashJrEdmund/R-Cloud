import type { RecordingData } from "./types";

import { DivCard, TextTag } from "@/components/atoms";
import { Suspense } from "react";
import { RecordingShimmer, RecordingsCard } from "./recording-cards";

const DemoData: RecordingData[] = [
  {
    heading: "Get Authenticated",
    source: "/recordings/r-cloud-not-signed-in-recording.webm",
  }
];

async function RecordingsDisplay() {
  return DemoData.map(({ heading, source }) => (
    <RecordingsCard
      key={heading}
      data={{ heading, source }}
    />
  ))
}

export default function Recordings() {
  return (
    <DivCard className="w-primary_app_width flex-col justify-start gap-8 border-app_orange">
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
