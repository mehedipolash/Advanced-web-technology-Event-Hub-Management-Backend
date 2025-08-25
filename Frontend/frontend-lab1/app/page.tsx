import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <h5>Hello world!</h5>

      {/* Next.js Link */}
      <Link href="/about">About using Link</Link>
      <br />

      {/* Normal anchor */}
      <a href="/about">About using hyperlink</a>
      <br />

      {/* Next.js Image */}
      <Image
        src="/test.jpg"
        alt="Next.js Logo"
        width={200}
        height={200}
      />
    </>
  );
}
