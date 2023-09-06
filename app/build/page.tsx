'use client';

import React, { useCallback, useEffect, useReducer } from 'react';

// Reducers
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import formReducer from '@/(private)/_lib/reducers/formReducer';

// Types
import { FormUseReducer } from '@/(private)/_types/components/formTypes';

// Constants
import INITIAL_FORM from '@/(private)/_lib/constants/formConstants';

// Components
import Form from '@/(private)/_components/build/Form';
import simulationActionCreators from '@/(private)/_lib/actions/simulationActions';
import formActionCreators from '@/(private)/_lib/actions/formActions';
import simulationReducer from '@/(private)/_lib/reducers/simulationReducer';
import { UseReducer } from '@/(private)/_types/components/simulationTypes';

export default function BuildPage() {
  const [, dispatchSimulation]: UseReducer = useReducer(simulationReducer, []);
  const [form, dispatchForm]: FormUseReducer = useReducer(formReducer, INITIAL_FORM);

  const onStage = useCallback(async (): Promise<void> => {
    await simulationActionCreators.createSimulation(dispatchSimulation, form);
  }, [form]);

  const onReset = useCallback((): void => {
    formActionCreators.createForm(dispatchForm, INITIAL_FORM);
  }, []);

  useEffect(() => {
    simulationActionCreators.readAllSimulations(dispatchSimulation);
  }, []);

  return (
    <>
      <header className="p-4 border-b border-b-neutral-800 flex justify-between">
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
        >
          Reset
        </Button>
      </footer>
    </>
  );
}
