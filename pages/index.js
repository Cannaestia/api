import React from 'react';
import Link from 'next/link';

const Index = () => {
  return (
    <>
    <div>
      <h1>Open AI</h1>
      <Link href="/completion" legacyBehavior>
        <a>Go to Open AI Tester</a>
      </Link>
    </div>
    <div>
        <h1>Linkedin</h1>
        <Link href="/[...slug]" legacyBehavior>
          <a>Go to Linkedin Tester</a>
        </Link>
      </div></>
  );
};

export default Index;
