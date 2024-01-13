/* eslint-disable no-unused-vars */
import Image from 'next/image';
import StyledFormWrapper from './StyledFormWrapper';
import { handleFormAction } from '@/core/lib/actions';

interface Props {
  children: React.ReactNode;
  img_url: string;
  formAction: (formData: FormData) => void;
};

export default function FormWrapper({ children, img_url, formAction }: Props) {
  // (formData: FormData) => handleFormAction(formData, formAction)}
  return (
    <StyledFormWrapper>
      <form className='form' action={(formData: FormData) => handleFormAction(formData, formAction)}>
        {children}
      </form>

      <div className='img-holder'>
        <Image
          src={`/auth-images/${img_url}`}
          alt='login image'
          height={550}
          width={550}
        />
      </div>
    </StyledFormWrapper>
  );
};
