import { ComponentProps } from "react";
import { cn } from "@/core/lib/utils";
import { MainTag } from "@/components/atoms";
import { TopSection } from "@/components/molecules";

interface MainAndTopSectionProps extends ComponentProps<"main"> {
  //
}

function MainAndTopSection({ className, children, ...restProps }: MainAndTopSectionProps) {
  return (
    <MainTag
      {...(restProps as {})}
      className={cn(
        "justify-start",
        className
      )}
    >
      <TopSection />

      <>
        {children}
      </>
    </MainTag>
  );
}

export default MainAndTopSection;
