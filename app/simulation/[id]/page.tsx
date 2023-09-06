'use client';

import { Button } from '@nextui-org/react';
import Link from 'next/link';
import React, {
  useEffect, useMemo, useReducer,
} from 'react';
import formActionCreator from '@/(private)/_lib/actions/formActions';
import Details from '@/(private)/_components/details/Details';
import simulationActionCreators from '@/(private)/_lib/actions/simulationActions';
import { Simulation, UseReducer } from '@/(private)/_types/components/simulationTypes';
import simulationReducer from '@/(private)/_lib/reducers/simulationReducer';
import { FormUseReducer } from '@/(private)/_types/components/formTypes';
import formReducer from '@/(private)/_lib/reducers/formReducer';
import INITIAL_FORM from '@/(private)/_lib/constants/formConstants';

export default function SimulationPage({ params: { id } }: any) {
  const [simulations, dispatchSimulation]: UseReducer = useReducer(simulationReducer, []);
  useEffect(() => { simulationActionCreators.readAllSimulations(dispatchSimulation); }, []);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [form, dispatchForm]: FormUseReducer = useReducer(formReducer, INITIAL_FORM);
  const selectedSimulation: Simulation | undefined = useMemo(() => simulations.find(
    (simulation: Simulation): boolean => simulation.id === id,
  ), [simulations, id]);

  const onRecreate = (): void => {
    formActionCreator.createForm(dispatchForm, selectedSimulation!.form);
  };

  if (selectedSimulation === undefined) return <div>Loading</div>;
  return (
    <>
      <header className="p-4 border-b border-b-neutral-800">
        <div className="pt-2">Job details</div>
      </header>
      <main className="p-4">
        <Details
          selectedSimulation={selectedSimulation}
          dispatchSimulation={dispatchSimulation}
        />
      </main>
      <footer className="p-4 border-t border-t-neutral-800">
        <Button
          href="/build"
          as={Link}
          onClick={onRecreate}
          variant="light"
        >
          Recreate
        </Button>
      </footer>
    </>
  );
}
