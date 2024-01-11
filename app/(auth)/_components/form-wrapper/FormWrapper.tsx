import Image from 'next/image';
import StyledFormWrapper from './StyledFormWrapper';

interface Props {
  children: React.ReactNode;
  img_url: string;
};

export default function FormWrapper({ children, img_url }: Props) {
  return (
    <StyledFormWrapper>
      <form className='form'>
        {children}
      </form>
      <div className='img-holder'>
        <Image
          src={`/auth-images/${img_url}`}
          alt='login image'
          height={500}
          width={500}
        />
      </div>
    </StyledFormWrapper>
  );
};
