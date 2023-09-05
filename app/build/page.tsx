'use client';

import React, { useReducer } from 'react';

// Reducers
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import formReducer from '@/_lib/reducers/formReducer';

// Types
import { FormUseReducer } from '@/_types/components/formTypes';

// Constants
import INITIAL_FORM from '@/_lib/constants/formConstants';

// Components
import Form from '@/_components/build/Form';
import simulationActionCreators from '@/_lib/actions/simulationActions';
import formActionCreators from '@/_lib/actions/formActions';
import simulationReducer from '@/_lib/reducers/simulationReducer';
import { UseReducer } from '@/_types/components/simulationTypes';

export default function BuildPage() {
  const [form, dispatchForm]: FormUseReducer = useReducer(formReducer, INITIAL_FORM);

  const [, dispatchSimulation]: UseReducer = useReducer(simulationReducer, []);

  const onStage = (): void => {
    formActionCreators.createForm(dispatchForm, INITIAL_FORM);
    simulationActionCreators.createSimulation(dispatchSimulation, form);
  };

  const onReset = (): void => {
    formActionCreators.createForm(dispatchForm, INITIAL_FORM);
  };

  return (
    <>
      <header className="p-4 border-b border-b-neutral-800 flex justify-between gap-4">
        <div className="pt-2">Job configuration</div>
        <Button
          href="/"
          as={Link}
          color="primary"
          onClick={onStage}
        >
          Stage
        </Button>
      </header>
      <main className="p-4">
        <Form form={form} dispatchForm={dispatchForm} />
      </main>
      <footer className="p-4 border-t border-t-neutral-800">
        <Button
          onClick={onReset}
          variant="light"
        >
          Reset
        </Button>
      </footer>
    </>

  );
}
