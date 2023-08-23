import { Divider } from '@nextui-org/react';
import React from 'react';

export default function Sidebar() {
  return (
    <>
      <header className="p-4">Username</header>
      <Divider />
      <main className="p-4">
        Options
      </main>
    </>
  );
}
