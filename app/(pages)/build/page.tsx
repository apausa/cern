'use client';

import React, {
  useCallback, useEffect, useReducer, useState,
} from 'react';
import { Button, Spinner } from '@nextui-org/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Reducers
import formReducer from '@/_private/lib/reducers/formReducer';
import simulationReducer from '@/_private/lib/reducers/simulationReducer';

// Constants
import INITIAL_FORM from '@/_private/lib/constants/formConstants';

// Components
import BuildMain from '@/_private/components/build/BuildMain';

// Actions
import simulationActionCreators from '@/_private/lib/actions/simulationActions';
import formActionCreators from '@/_private/lib/actions/formActions';

export default function BuildPage() {
  const [loading, setLoading] = useState(true);
  const [, dispatchSimulation] = useReducer(simulationReducer, []);
  const [form, dispatchForm] = useReducer(formReducer, null);

  const onStage = useCallback(async (): Promise<void> => {
    await simulationActionCreators.createSimulation(dispatchSimulation, form);
  }, [form]);

  const onReset = useCallback((): void => {
    formActionCreators.createForm(dispatchForm, INITIAL_FORM);
  }, []);

  useEffect(() => {
    simulationActionCreators.readAllSimulations(dispatchSimulation);
    formActionCreators.readForm(dispatchForm);
  }, []);

  useEffect(() => {
    if (form) setLoading(false);
  }, [form]);

  if (!loading && !form) return notFound();

  return (
    <>
      <header className="p-4 border-b border-b-neutral-800 flex justify-between">
        <Button
          href="/"
          as={Link}
        >
          ←
        </Button>
        <div className="pt-2">Job configuration</div>
        <Button
          href="/"
          as={Link}
          color="primary"
          onClick={onStage}
          isDisabled={loading}
        >
          Stage
        </Button>
      </header>
      <main className="px-4 py-2 mb-auto">
        {loading ? <Spinner /> : <BuildMain form={form} dispatchForm={dispatchForm} />}
      </main>
      <footer className="p-4 border-t border-t-neutral-800">
        <Button
          onClick={onReset}
          isDisabled={loading}
        >
          Reset
        </Button>
      </footer>
    </>
  );
}
