import { Metadata } from 'next';
import './profile.css';

export async function generateMetadata(): Promise<Metadata> {
  // to dynamically generate metadata
  return {
    title: 'Profile',
    description: 'r-cloud profile page',
    alternates: {
      canonical: '/profile',
    },
  };
}

interface Props { };

export default function Profile({ }: Props) {
  return (
    <main>
      <h1>Your Profile</h1>
    </main>
  );
}
