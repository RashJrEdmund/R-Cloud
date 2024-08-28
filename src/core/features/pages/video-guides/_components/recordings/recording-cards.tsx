import { DivCard, TextTag } from "@/components/atoms";
import { Skeleton } from "@/components/ui/skeleton";
import type { RecordingData } from "./types";
import { cn } from "@/core/lib/utils";

function RecordingShimmer({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    /**
     * h-[calc((var(--primary\_app\_width)_/_2)_+_15px)] to give height: calc((var(--primary_app_width) / 2));
     * I've noticed that the height of the video tag is dependent on it's width, and i've approximated it to be half the width plus a small negligible constant
     * I think freely placed images follow the same principle with their dimensions
     */
    <Skeleton
      className={cn(
        "flex min-h-[calc((var(--primary\\_app\\_width)_/_2))] w-full max-w-primary_app_width items-end p-4 shadow-md shadow-app_blue md:shadow-lg md:shadow-app_blue",
        className
      )}
    >
      {children}
      <Skeleton className="h-[30px] w-full bg-app_bg_grayed md:h-[40px] lg:h-[50px]" />
    </Skeleton>
  );
}

function RecordingsCard({
  data: { heading, source, comingSoon },
}: {
  data: RecordingData;
}) {
  return (
    <DivCard className="w-full max-w-primary_app_width flex-col gap-4">
      <TextTag
        as="h3"
        className="w-full text-[0.7rem] font-semibold sm:text-xl"
      >
        {heading}
      </TextTag>

      {comingSoon ? (
        <RecordingShimmer className="relative h-[calc((var(--primary\_app\_width)_/_2)_-_27px)] min-h-[205.44px]">
          <TextTag className="absolute left-1/2 top-0 mt-3 -translate-x-1/2 whitespace-nowrap font-semibold text-app_blue">
            Coming Soon
          </TextTag>
        </RecordingShimmer>
      ) : (
        <video
          controls
          src={`${source}`}
          // src={`${source}#t=3.6`}
          // preload="metadata"
          poster="/landing/video-thumbnail.svg"
          className="w-full bg-app_bg_light shadow-md shadow-app_blue md:shadow-lg md:shadow-app_blue"
        >
          <TextTag className="bg-red-500">Video not found</TextTag>
        </video>
      )}
    </DivCard>
  );
}

export { RecordingShimmer, RecordingsCard };
