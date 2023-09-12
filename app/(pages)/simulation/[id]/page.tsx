'use client';

import { Button, Spinner } from '@nextui-org/react';
import React, {
  useCallback,
  useEffect, useMemo, useReducer, useState,
} from 'react';
import { notFound } from 'next/navigation';

// Components
import Link from 'next/link';
import SimulationDetails from '@/_private/components/simulation/SimulationDetails';

// Types
import { Simulation } from '@/_private/types/components/simulationTypes';

// Actions
import simulationActionCreators from '@/_private/lib/actions/simulationActions';
import formActionCreators from '@/_private/lib/actions/formActions';

// Reducers
import simulationReducer from '@/_private/lib/reducers/simulationReducer';
import formReducer from '@/_private/lib/reducers/formReducer';

export default function SimulationPage(
  { params: { id } }:
  { params: { id: string } },
) {
  const [loading, setLoading] = useState(true);
  const [simulations, dispatchSimulation] = useReducer(simulationReducer, []);
  const [, dispatchForm] = useReducer(formReducer, null);

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
        <Button
          href="/"
          as={Link}
        >
          ←
        </Button>
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
            <SimulationDetails
              selectedSimulation={selectedSimulation as Simulation}
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
