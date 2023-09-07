'use client';

import { Button, Spinner } from '@nextui-org/react';
import React, {
  useCallback,
  useEffect, useMemo, useReducer, useState,
} from 'react';
import { notFound } from 'next/navigation';

// Components
import Link from 'next/link';
import Details from '@/(private)/_components/details/Details';

// Types
import { Simulation, UseReducer } from '@/(private)/_types/components/simulationTypes';
import { FormUseReducer } from '@/(private)/_types/components/formTypes';

// Actions
import simulationActionCreators from '@/(private)/_lib/actions/simulationActions';
import formActionCreators from '@/(private)/_lib/actions/formActions';

// Reducers
import simulationReducer from '@/(private)/_lib/reducers/simulationReducer';
import formReducer from '@/(private)/_lib/reducers/formReducer';

export default function SimulationPage({ params: { id } }: any) {
  const [loading, setLoading] = useState(true);
  const [simulations, dispatchSimulation]: UseReducer = useReducer(simulationReducer, []);
  const [, dispatchForm]: FormUseReducer = useReducer(formReducer, null);
  const selectedSimulation: Simulation | undefined = useMemo(() => simulations.find(
    (simulation: Simulation): boolean => simulation.id === id,
  ), [simulations, id]);

  const onRecreate = useCallback((): void => {
    formActionCreators.createForm(dispatchForm, selectedSimulation!.form);
  }, [selectedSimulation]);

  const onDelete = useCallback((): void => {}, []); // @develop

  useEffect(() => {
    simulationActionCreators.readAllSimulations(dispatchSimulation);
  }, []);

  useEffect(() => {
    if (selectedSimulation) setLoading(false);
  }, [selectedSimulation]);

  if (!loading && !selectedSimulation) return notFound();

  return (
    <>
      <header className="p-4 border-b border-b-neutral-800  flex justify-between">
        <div className="pt-2">Job details</div>
        <Button
          onClick={onRecreate}
          isDisabled={loading}
          href="/build"
          as={Link}
        >
          Recreate
        </Button>
      </header>
      <main className="px-4 pt-2 mb-auto">
        {(loading)
          ? (<Spinner />)
          : (
            <Details
              selectedSimulation={selectedSimulation}
              dispatchSimulation={dispatchSimulation}
            />
          )}
      </main>
      <footer className="p-4 border-t border-t-neutral-800">
        <Button
          onClick={onDelete}
          variant="light"
          color="danger"
          isDisabled={loading}
        >
          Delete
        </Button>
      </footer>
    </>
  );
}
