'use client';

import { Button } from '@nextui-org/react';
import React, {
  useCallback,
  useEffect, useMemo, useReducer,
} from 'react';
import { useRouter } from 'next/navigation';
import Details from '@/(private)/_components/details/Details';
import simulationActionCreators from '@/(private)/_lib/actions/simulationActions';
import { Simulation, UseReducer } from '@/(private)/_types/components/simulationTypes';
import simulationReducer from '@/(private)/_lib/reducers/simulationReducer';

export default function SimulationPage({ params: { id } }: any) {
  const router = useRouter();
  const [simulations, dispatchSimulation]: UseReducer = useReducer(simulationReducer, []);

  const selectedSimulation: Simulation | undefined = useMemo(() => simulations.find(
    (simulation: Simulation): boolean => simulation.id === id,
  ), [simulations, id]);

  const onClick = useCallback((): void => {
    if (selectedSimulation) {
      router.push(`/build/${selectedSimulation.id}`);
    }
  }, [selectedSimulation]);

  useEffect(() => {
    simulationActionCreators.readAllSimulations(dispatchSimulation);
  }, []);

  // @develop, diferentiate between loading and not found
  // @develop, implement recreate functionality
  // @develop, implemente delete functionality

  return (
    <>
      <header className="p-4 border-b border-b-neutral-800">
        <div className="pt-2">Job details</div>
      </header>
      <main className="p-4">
        {selectedSimulation
          ? (
            <Details
              selectedSimulation={selectedSimulation}
              dispatchSimulation={dispatchSimulation}
            />
          )
          : <div>Not found</div>}
      </main>
      <footer className="p-4 border-t border-t-neutral-800">
        <Button
          isDisabled={!selectedSimulation}
          onClick={onClick}
        >
          Recreate
        </Button>
      </footer>
    </>
  );
}
