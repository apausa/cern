'use client';

import React, {
  useCallback, useEffect, useReducer, useState,
} from 'react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

// Reducers
import { notFound } from 'next/navigation';
import formReducer from '@/(private)/_lib/reducers/formReducer';
import simulationReducer from '@/(private)/_lib/reducers/simulationReducer';

// Types
import { FormUseReducer } from '@/(private)/_types/components/formTypes';
import { UseReducer } from '@/(private)/_types/components/simulationTypes';

// Constants
import INITIAL_FORM from '@/(private)/_lib/constants/formConstants';

// Components
import Form from '@/(private)/_components/build/Form';

// Actions
import simulationActionCreators from '@/(private)/_lib/actions/simulationActions';
import formActionCreators from '@/(private)/_lib/actions/formActions';

export default function BuildPage() {
  const [loading, setLoading]: any = useState(true);
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

  useEffect(() => {
    if (form) setLoading(false);
  }, [form]);

  if (!loading && !form) return notFound();

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
      <main className="px-4 py-2 mb-auto">
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
