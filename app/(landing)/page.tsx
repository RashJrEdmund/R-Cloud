import './landing.css';

import Link from 'next/link';

export default function Landing() {
  return (
    <main>
      <h1 className='text-blue-600'>Landing page.</h1>

      <Link href='/home' className='border border-blue-600'>My R-Cloud</Link>
    </main>
  );
}
