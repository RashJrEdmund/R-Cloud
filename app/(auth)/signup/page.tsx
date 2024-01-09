import '../auth.css';

export async function generateMetadata() { // to dynamically generate metadata
  return {
    title: 'Signup',
    description: 'r-cloud signup page',
    alternates: {
      canonical: '/signup'
    }
  };
};

export default function Signup() {
  return (
    <main>
      <h1>Sign up</h1>
    </main>
  );
}
