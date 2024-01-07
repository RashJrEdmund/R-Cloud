import './profile.css';

export async function generateMetadata() {
  // to dynamically generate metadata
  return {
    title: 'Profile',
    description: 'r-cloud profile page',
    alternates: {
      canonical: '/profile',
    },
  };
}

export default function Profile() {
  return (
    <main>
      <h1>Your Profile</h1>
    </main>
  );
}
