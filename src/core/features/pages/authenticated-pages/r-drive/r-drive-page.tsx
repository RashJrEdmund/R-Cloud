import { MainTag, TextTag } from "@/components/atoms";
import { TopSection } from "@/components/molecules";
import { DriveDisplay } from "./_components";

interface Props {}

export default function RDrivePage({}: Props) {
  return (
    <MainTag className="w-primary_app_width">
      <TopSection hide_search_section />

      <TextTag as="h2" className="whitespace-nowrap font-semibold">
        My R - Drive
      </TextTag>

      <DriveDisplay />
    </MainTag>
  );
}
