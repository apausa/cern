import React from 'react';
import Build from '@/components/dashboard/build';
import Test from '@/components/dashboard/test';
import Monitor from '@/components/dashboard/monitor';
import Header from '@/components/header';

export default async function Home() {
  return (
    <>
      <header className="fixed w-screen border-b-2 h-16  bg-white">
        <Header />
      </header>
      <main className="columns-1 md:columns-3">
        <Build />
        <Test />
        <Monitor />
      </main>
    </>
  );
}
