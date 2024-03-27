import { AppModalWrapper } from '@/components/modals/generics';
import { TextTag, DivCard } from '@/components/atoms';
import { ProgressBar } from '@/components/molecules';
import { getSizeFromBytes } from '@/utils/file-utils';

import type { MutableRefObject } from 'react';
import type { IModalWrapperRef } from '@/components/modals/generics';

interface Props {
  uploadModalRef: MutableRefObject<IModalWrapperRef | undefined>; isLoading: boolean;

  selectedFiles: File[];
  uploadDetails: {
    total_size: number;
    count: number;
  } | null;

  progress: { [key: number]: number } | null;
  currentUploadIndx: number;

  closeModal: () => void;

  uploadFiles: () => Promise<void>;
};

export default function UploadModal({
  uploadModalRef, isLoading,
  selectedFiles,

  uploadDetails,
  progress,
  currentUploadIndx,

  closeModal,
  uploadFiles,
}: Props) {

  return (
    <AppModalWrapper ref={uploadModalRef as any}
      prevent_auto_focus
      use_base_btns_instead
      isLoading={isLoading}
      cancelAction={closeModal}
      confirmAction={uploadFiles}
    >
      <TextTag>
        You&apos;ve selected
        <TextTag color_type='success'>
          {selectedFiles.length} file{selectedFiles.length > 0 ? 's' : ''}
        </TextTag>
      </TextTag>

      <TextTag>
        Total upload size <TextTag color_type='success'>{getSizeFromBytes(Number(uploadDetails?.total_size ?? 0)).merged}</TextTag>
      </TextTag>

      {progress && (
        <DivCard width='100%' flex_dir='column' align='start' justify='start' gap='10px'>
          <DivCard gap='10px' flex_wrap='nowrap'>
            <TextTag>
              uploading {currentUploadIndx + 1} / {selectedFiles.length}
            </TextTag>

            <TextTag color_type='success'>
              {progress[currentUploadIndx].toFixed(1) + ' %'}
            </TextTag>
          </DivCard>

          {
            progress[currentUploadIndx] ? (
              <ProgressBar progress_in_percentage={+progress[currentUploadIndx].toFixed(1)} />
            ) : null
          }
        </DivCard>
      )}
    </AppModalWrapper>
  );
};
