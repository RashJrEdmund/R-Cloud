import { MainTag } from "@/components/atoms";
import { TopSection } from "@/components/molecules";
import { ProfileDisplay } from "./_components";

interface Props {}

export default function ProfilePage({}: Props) {
  return (
    <MainTag className="justify-start">
      <TopSection hide_search_section />

      <ProfileDisplay />
    </MainTag>
  );
}
