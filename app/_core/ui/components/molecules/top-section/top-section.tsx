import { DivCard } from '@/components/atoms';
import Navigator from './_components/navigator';
import Search from './_components/search';
import TopSectionHolder from './top-section-holder';

interface Props {
  //
};

export default function TopSection({ }: Props) {
  return (
    <TopSectionHolder>
      <Navigator />

      {/* TODO +=> ADD SEARCH BAR COMPONENT AND NAVIGATOR HERE. */}

      <DivCard gap='1rem'>
        <Search />
        {/* TODO +=> BUILD MORE MODAL DROP DOWN AND ACTUAL MODAL */}
      </DivCard>
    </TopSectionHolder>
  );
};
