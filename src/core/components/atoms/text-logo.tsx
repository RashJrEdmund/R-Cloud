import { cn } from "@/core/lib/utils";
import { APP_ICONS } from "@/core/ui/icons";
import Image from "next/image";
import { ComponentProps } from "react";

interface TextLogoProps extends ComponentProps<"span"> {
  /**
   * for uniquely styling only the image
   */
  sxImgClassName?: string;

  /**
   * for uniquely styling only the text
   */
  sxTextClassName?: string;
  showLogo?: boolean;
}

export default function TextLogo({
  showLogo,
  sxImgClassName = "",
  sxTextClassName = "",
  className = "",
  ...restProps
}: TextLogoProps) {
  return (
    <span
      {...restProps}
      className={cn(
        "flex w-fit flex-nowrap items-center justify-center gap-1 text-app_text_grayed",
        className
      )}
    >
      {showLogo ? (
        <Image
          src={APP_ICONS.logo}
          width={45}
          height={45}
          alt="app logo"
          className={cn(sxImgClassName)}
        />
      ) : null}

      <span className={cn("whitespace-nowrap", sxTextClassName)}>
        R - Cloud
      </span>
    </span>
  );
}
