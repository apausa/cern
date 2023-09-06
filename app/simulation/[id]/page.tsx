'use client';

import { Button, Spinner } from '@nextui-org/react';
import React, {
  useCallback,
  useEffect, useMemo, useReducer, useState,
} from 'react';
import { notFound } from 'next/navigation';
import Details from '@/(private)/_components/details/Details';
import simulationActionCreators from '@/(private)/_lib/actions/simulationActions';
import { Simulation, UseReducer } from '@/(private)/_types/components/simulationTypes';
import simulationReducer from '@/(private)/_lib/reducers/simulationReducer';

export default function SimulationPage({ params: { id } }: any) {
  const [loading, setLoading] = useState(true);
  const [simulations, dispatchSimulation]: UseReducer = useReducer(simulationReducer, []);

  const selectedSimulation: Simulation | undefined = useMemo(() => simulations.find(
    (simulation: Simulation): boolean => simulation.id === id,
  ), [simulations, id]);

  const onRecreate = useCallback((): void => {}, []); // @develop
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
      <header className="p-4 border-b border-b-neutral-800">
        <div className="pt-2">Job details</div>
      </header>
      <main className="p-4">
        {(loading)
          ? (<Spinner />)
          : (
            <Details
              selectedSimulation={selectedSimulation}
              dispatchSimulation={dispatchSimulation}
            />
          )}
      </main>
      <footer className="p-4 border-t border-t-neutral-800 flex justify-between">
        {(selectedSimulation === undefined)
          ? (<div />)
          : (
            <>
              <Button
                onClick={onRecreate}
              >
                Recreate
              </Button>
              <Button
                onClick={onDelete}
                variant="light"
                color="danger"
              >
                Delete
              </Button>
            </>
          )}
      </footer>
    </>
  );
}
