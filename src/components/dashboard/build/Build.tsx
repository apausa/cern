/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import React, { SyntheticEvent, useState } from 'react';
import { Button, Divider } from '@nextui-org/react';
import Form from './form/Form';

export default function Build({ handleCreateMetadata }: any) {
  const [build, setBuild]: any = useState(false);

  const handleClick = (): void => { setBuild(!build); };

  return (
    <div className="flex flex-nowrap">
      <div className="basis-64 flex-none h-screen border-r">
        <header>Full name</header>
        <Divider />
        <main>
          <Button color="primary" onClick={handleClick} isDisabled={build}>Build</Button>
        </main>
      </div>
      {build && (<Form handleClick={handleClick} />)}
    </div>
  );
}
