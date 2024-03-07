import { MainTag, TextTag } from '@/components/atoms';
import { TopSection } from '@/components/molecules';
import { DriveDisplay } from './_components';

interface Props { };

export default function RDrive({ }: Props) {
  return (
    <MainTag>
      <TopSection hide_search_section />
      <TextTag as='h2' weight='600' no_white_space>
        My R - Drive
      </TextTag>

      <DriveDisplay />
    </MainTag>
  );
};
