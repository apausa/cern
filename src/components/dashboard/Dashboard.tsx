import { Button, Divider } from '@nextui-org/react';
import React from 'react';

export default function Dashboard({ build, handleClick }: any) {
  return (
    <>
      <header className="p-4">Full name</header>
      <Divider />
      <main className="p-4">
        <Button color="primary" onClick={handleClick} isDisabled={build}>Build</Button>
      </main>
    </>
  );
}
