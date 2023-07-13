import React from 'react';
import Build from '@/components/build';
import Test from '@/components/test';
import Monitor from '@/components/monitor';

export default async function Home() {
  return (
    <main>
      <Build />
      <Test />
      <Monitor />
    </main>
  );
}
