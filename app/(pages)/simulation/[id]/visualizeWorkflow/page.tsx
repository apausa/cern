/* eslint-disable consistent-return */

'use client';

import React, {
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
import DeleteButton from '@/_private/components/details/detailsFooter/DeleteButton';
import CopyButton from '@/_private/components/details/detailsFooter/CopyButton';
import RecreateButton from '@/_private/components/details/detailsFooter/RecreateButton';

export default function GraphvizPage(
  { params: { id } }:
  { params: { id: string } },
) {
  const router = useRouter();

  const ref = useRef(null);
  const [loading, setLoading] = useState(true);
  const [rendered, setRendered] = useState<null | boolean>(null);
  const [deleted, setDeleted] = useState(false);
  const [simulations, dispatchSimulation] = useReducer(simulationReducer, []);

  // Gets all configured jobs
  useEffect(() => {
    simulationActionCreators.readAllSimulations(dispatchSimulation);
  }, []);

  // Finds job by query
  const selectedSimulation: Simulation | undefined = useMemo(() => simulations.find(
    (simulation: Simulation): boolean => (simulation.id === id),
  ), [simulations, id]);

  // When job is deleted or assigned a value
  useEffect((): void => {
    // If job is deleted, redirects to root segment
    if (!selectedSimulation && deleted) router.push('/');
    // If job is assigned a value, stops loading
    else if (loading) setLoading(false);

    if (selectedSimulation) {
      const {
        scripts: {
          visualizeWorkflow: { graphvizData, scriptStatus },
        },
      }: Simulation = selectedSimulation!;

      switch (scriptStatus) {
        case 'Staged': // Creates and runs script
          simulationActionCreators.updateSimulationScriptStatus(
            dispatchSimulation,
            selectedSimulation as Simulation,
            'visualizeWorkflow',
          );

          simulationActionCreators.runSimulationScript(
            dispatchSimulation,
            selectedSimulation as Simulation,
            'visualizeWorkflow',
          );
          break;
        case 'Completed': // Renders visualization
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

  // If job is deleted, does not render page
  if (deleted) return null;

  // If job is undefined or visualization isn't rendered, redirects to not found
  if ((!loading && !selectedSimulation) || (rendered === false)) return notFound();

  // Else, renders page
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
