import { _onAuthStateChange } from '@/core/config/firebase';
import { useRouter } from 'next/navigation';

export default function AuthGuard(Component: React.JSXElementConstructor<React.ReactNode>) {
  return async function Guard(props: any) {
    const currentUser = await _onAuthStateChange();

    // console.log({ auth_currentuser: currentUser });
    // if (!currentUser) throw redirect('/login');

    return <Component {...props} currentUser={currentUser} />;
  };
};
