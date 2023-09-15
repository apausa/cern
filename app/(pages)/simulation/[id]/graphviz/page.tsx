/* eslint-disable consistent-return */

'use client';

import React, {
  useCallback,
  useEffect, useMemo, useReducer, useRef, useState,
} from 'react';
import { notFound } from 'next/navigation';
import { graphviz } from 'd3-graphviz';

// Types
import { Button, Link, Spinner } from '@nextui-org/react';
import { Simulation } from '@/_private/types/lib/simulationTypes';

// Actions
import simulationActionCreators from '@/_private/lib/actions/simulationActions';

// Reducers
import simulationReducer from '@/_private/lib/reducers/simulationReducer';
import SimulationFooter from '@/_private/components/simulation/SimulationFooter';

export default function Graphviz(
  { params: { id } }:
  { params: { id: string } },
) {
  const ref: any = useRef(null);
  const [loading, setLoading] = useState(true);
  const [simulations, dispatchSimulation] = useReducer(simulationReducer, []);

  useEffect(() => {
    simulationActionCreators.readAllSimulations(dispatchSimulation);
  }, []);

  const selectedSimulation: Simulation | undefined = useMemo(() => simulations.find(
    (simulation: Simulation): boolean => (simulation.id === id),
  ), [simulations, id]);

  const handleRunSimulationScript = useCallback((): void => {
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
    if (selectedSimulation) {
      const {
        scripts: {
          localCreateWorkflow: { graphvizData, scriptStatus },
        },
      }: Simulation = selectedSimulation;

      switch (scriptStatus) {
        case 'Staged':
          handleRunSimulationScript();
          break;
        case 'Completed' || 'Error':
          if (graphvizData) {
            graphviz(ref.current)
              .renderDot(graphvizData);
          }
          setLoading(false);
          break;
        default:
          break;
      }
    } else {
      setLoading(false);
    }
  }, [selectedSimulation]);

  if (!loading && !selectedSimulation) return notFound();
  /* @develop, when simulation returns error nothing happens. to do:
   - useEffect to control when...
   - b
  */

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
        <div />
      </header>
      <main className="mb-auto overflow-auto">
        {loading ? <Spinner /> : <div ref={ref} />}
      </main>
      <footer className="p-4 border-t border-t-neutral-800 flex justify-between">
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
