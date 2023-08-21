import { Button, Divider } from '@nextui-org/react';
import React from 'react';

export default function Dashboard({ build, handleClick }: any) {
  return (
    <>
      <header>Full name</header>
      <Divider />
      <main>
        <Button color="primary" onClick={handleClick} isDisabled={build}>Build</Button>
      </main>
    </>
  );
}
