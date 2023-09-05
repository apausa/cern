'use client';

import React, { useReducer } from 'react';

// Reducers
import formReducer from '@/_lib/reducers/formReducer';

// Types
import { FormUseReducer } from '@/_types/components/formTypes';

// Constants
import INITIAL_FORM from '@/_lib/constants/formConstants';

// Components
import Form from '@/_components/build/Form';
import BuildHeader from '@/_components/build/BuildHeader';

export default function BuildPage() {
  const [form, dispatchForm]: FormUseReducer = useReducer(formReducer, INITIAL_FORM);

  return (
    <>
      <BuildHeader dispatchForm={dispatchForm} form={form} />
      <main className="p-4">
        <Form form={form} dispatchForm={dispatchForm} />
      </main>
    </>

  );
}
