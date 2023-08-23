import { Button, Divider } from '@nextui-org/react';
import React from 'react';

// Types
import { SidebarProps } from '@/types/build';

export default function Sidebar({ handleReturn, openForm }: SidebarProps) {
  return (
    <>
      <header className="p-4">Full name</header>
      <Divider />
      <main className="p-4">
        <Button color="primary" onClick={handleReturn} isDisabled={openForm}>Build</Button>
      </main>
    </>
  );
}
