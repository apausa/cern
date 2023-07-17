'use client';

import React, { useEffect, useState } from 'react';
import Build from '@/components/dashboard/Build';
import Test from '@/components/dashboard/Test';
import Monitor from '@/components/dashboard/Monitor';
import Header from '@/components/Header';

export default async function Dashboard() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, setStatus] = useState(false);
  const handleClick = () => { setStatus(true); };

  useEffect(() => {
    console.log('test');
  }, [status]);

  return (
    <>
      <header className="fixed w-screen border-b-2 h-16 bg-white">
        <Header />
      </header>
      <main className="columns-1 md:columns-3">
        <Build handleClick={handleClick} />
        <Test />
        <Monitor />
      </main>
    </>
  );
}
