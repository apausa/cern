/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import React, { SyntheticEvent, useState } from 'react';
import { Button, Divider } from '@nextui-org/react';
import Form from './form/Form';

export default function Build({ handleCreateMetadata }: any) {
  const [build, setBuild]: any = useState(false);

  const handleClick = (): void => { setBuild(!build); };
  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();

    handleClick();
    // handleCreateMetadata(version, o2CmdStr);
  };

  return (
    <div className="flex flex-nowrap">
      <div className="basis-64 flex-none h-screen border-r">
        <header>Full name</header>
        <Divider />
        <main>
          <Button color="primary" onClick={handleClick} isDisabled={build}>Build</Button>
        </main>
      </div>
      {build && (
      <div className="basis-128 flex-none h-screen border-r">
        <header>
          <Button color="primary" onClick={handleClick}>Return</Button>
          <Button color="primary" onSubmit={handleSubmit}>Submit</Button>
        </header>
        <Divider />
        <main>
          <Form />
        </main>
      </div>
      )}
    </div>
  );
}
