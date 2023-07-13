import React from 'react';
import Build from '@/components/build';
import Test from '@/components/test';
import Monitor from '@/components/monitor';
import Header from '@/components/header';

export default async function Home() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Build />
        <Test />
        <Monitor />
      </main>
    </>
  );
}
