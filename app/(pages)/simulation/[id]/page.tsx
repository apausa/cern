'use client';

import { Button, Spinner } from '@nextui-org/react';
import React, {
  useEffect, useMemo, useReducer, useState,
} from 'react';
import { notFound } from 'next/navigation';

// Components
import Link from 'next/link';
import SimulationMain from '@/_private/components/simulation/SimulationMain';

// Types
import { Simulation } from '@/_private/types/lib/simulationTypes';

// Actions
import simulationActionCreators from '@/_private/lib/actions/simulationActions';

// Reducers
import simulationReducer from '@/_private/lib/reducers/simulationReducer';
import SimulationFooter from '@/_private/components/simulation/SimulationFooter';

export default function SimulationPage(
  { params: { id } }:
  { params: { id: string } },
) {
  const [loading, setLoading] = useState(true);
  const [simulations, dispatchSimulation] = useReducer(simulationReducer, []);

  const selectedSimulation: Simulation | undefined = useMemo(() => simulations.find(
    (simulation: Simulation): boolean => simulation.id === id,
  ), [simulations, id]);

  useEffect(() => {
    simulationActionCreators.readAllSimulations(dispatchSimulation);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [selectedSimulation]);

  if (!loading && !selectedSimulation) return notFound();

  return (
    <>
      <header className="p-4 border-b border-b-neutral-800  flex justify-between">
        <Button
          href="/"
          variant="light"
          as={Link}
        >
          ←
        </Button>
        <div className="pt-2">Job details</div>
        <div />
      </header>
      <main className="px-4 pt-2 mb-auto overflow-auto">
        {(loading)
          ? (<Spinner />)
          : (
            <SimulationMain
              selectedSimulation={selectedSimulation as Simulation}
              dispatchSimulation={dispatchSimulation}
            />
          )}
      </main>
      <footer className="p-4 border-t border-t-neutral-800  flex justify-between">
        <SimulationFooter
          loading={loading}
          selectedSimulation={selectedSimulation as Simulation}
          isOpen={false}
          onClose={() => {}}
        />
      </footer>
    </>
  );
}
