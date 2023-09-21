/* eslint-disable consistent-return */

'use client';

import React, {
  useCallback,
  useEffect, useMemo, useReducer, useRef, useState,
} from 'react';
import { notFound, useRouter } from 'next/navigation';
import { graphviz } from 'd3-graphviz';

// Types
import { Button, Link, Spinner } from '@nextui-org/react';
import { Simulation } from '@/_private/types/lib/simulationTypes';

// Actions
import simulationActionCreators from '@/_private/lib/actions/simulationActions';

// Reducers
import simulationReducer from '@/_private/lib/reducers/simulationReducer';
import DeleteButton from '@/_private/components/simulation/simulationFooter/deleteButton';
import CopyButton from '@/_private/components/simulation/simulationFooter/copyButton';
import RecreateButton from '@/_private/components/simulation/simulationFooter/recreateButton';

export default function Graphviz(
  { params: { id } }:
  { params: { id: string } },
) {
  const ref: any = useRef(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [rendered, setRendered] = useState<null | boolean>(null);
  const [deleted, setDeleted] = useState(false);
  const [simulations, dispatchSimulation] = useReducer(simulationReducer, []);

  useEffect(() => {
    simulationActionCreators.readAllSimulations(dispatchSimulation);
  }, []);

  const selectedSimulation: Simulation | undefined = useMemo(() => simulations.find(
    (simulation: Simulation): boolean => (simulation.id === id),
  ), [simulations, id]);

  const onRunSimulationScript = useCallback((): void => {
    simulationActionCreators.updateSimulationScriptStatus(
      dispatchSimulation,
      selectedSimulation as Simulation,
      'localCreateWorkflow',
    );

    simulationActionCreators.runSimulationScript(
      dispatchSimulation,
      selectedSimulation as Simulation,
      'localCreateWorkflow',
    );
  }, [dispatchSimulation, selectedSimulation]);

  useEffect(() => {
    if (!selectedSimulation && deleted) {
      router.push('/');
    } else if (loading) setLoading(false);

    if (selectedSimulation) {
      const {
        scripts: {
          localCreateWorkflow: { graphvizData, scriptStatus },
        },
      }: Simulation = selectedSimulation;

      switch (scriptStatus) {
        case 'Staged':
          onRunSimulationScript();
          break;
        case 'Completed':
          if (graphvizData) {
            graphviz(ref.current)
              .renderDot(graphvizData)
              .on('end', () => { setRendered(true); });
          } else {
            setRendered(false);
          }
          break;
        case 'Error':
          setRendered(false);
          break;
        default:
          break;
      }
    }
  }, [selectedSimulation, deleted]);

  if (deleted) return null;
  if ((!loading && !selectedSimulation) || (rendered === false)) return notFound();

  return (
    <>
      <header className="p-4 border-b border-b-neutral-800 flex justify-between">
        <Button
          href={`/simulation/${id}`}
          variant="light"
          as={Link}
        >
          ←
        </Button>
        <div className="pt-2">Job visualization</div>
        <Button className="invisible" />
      </header>
      <main className="mb-auto overflow-auto">
        <div ref={ref}>
          {!rendered && <Spinner className="pt-2 flex justify-center" />}
        </div>
      </main>
      <footer className="p-4 border-t border-t-neutral-800 ">
        {(loading)
          ? <Spinner className="flex justify-center" />
          : (
            <div className="flex justify-between">
              <DeleteButton
                selectedSimulation={selectedSimulation as Simulation}
                dispatchSimulation={dispatchSimulation}
                setDeleted={setDeleted}
              />
              <CopyButton />
              <RecreateButton
                selectedSimulation={selectedSimulation as Simulation}
                isOpen={false}
                onClose={() => {}}
              />
            </div>
          )}
      </footer>
    </>
  );
}
