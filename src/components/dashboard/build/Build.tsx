import React, { useState } from 'react';

// Types
import { BuildProps } from '@/types/build';

// Components
import Sidebar from './Sidebar';
import Form from './form/Form';

export default function Build({ createMetadata }: BuildProps) {
  const [openForm, setOpenForm] = useState(false);
  const handleReturn = (): void => { setOpenForm(!openForm); };

  return (
    <>
      <div className="basis-64 flex-none h-screen border-r">
        <Sidebar handleReturn={handleReturn} openForm={openForm} />
      </div>
      { openForm && (
      <div className="basis-128 flex-none h-screen border-r">
        <Form handleReturn={handleReturn} createMetadata={createMetadata} />
      </div>
      )}
    </>
  );
}
