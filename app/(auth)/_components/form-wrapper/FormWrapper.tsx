/* eslint-disable no-unused-vars */
import Image from 'next/image';
import StyledFormWrapper from './StyledFormWrapper';
import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  img_url: string;
  formAction: (formData: FormData) => void;
};

export default function FormWrapper({ children, img_url, formAction }: Props) {
  const handleFormAction = (formData: FormData) => {
    formAction(formData);
    // throw redirect('/home/photos/google/stuff'); // TODO +=> TAKE THIS OFF AND IMPLEMENT ACTUALL AUTHENTICATION;
  };

  return (
    <StyledFormWrapper>
      <form className='form' action={handleFormAction}>
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
