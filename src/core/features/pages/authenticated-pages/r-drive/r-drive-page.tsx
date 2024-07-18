import { Metadata } from "next";
import { MainTag, TextTag } from "@/components/atoms";
import { TopSection } from "@/components/molecules";
import { DriveDisplay } from "./_components";

export async function generateMetadata(): Promise<Metadata> {
  // to dynamically generate metadata
  return {
    title: "R - Drive",
    description: "user drive page",
    alternates: {
      canonical: "/r-drive/",
    },
  };
};

interface Props {};

export default function RDrivePage({}: Props) {
  return (
    <MainTag>
      <TopSection hide_search_section />
      <TextTag as="h2" weight="600" no_white_space>
        My R - Drive
      </TextTag>

      <DriveDisplay />
    </MainTag>
  );
}
