import { cn } from "@/core/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-app_bg_light", className)}
      {...props}
    />
  );
}

export { Skeleton };
