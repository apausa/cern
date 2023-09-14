/* eslint-disable @typescript-eslint/no-unused-expressions */

'use client';

import React, {
  useEffect, useMemo, useReducer, useRef, useState,
} from 'react';
import { notFound, useRouter } from 'next/navigation';
import { graphviz } from 'd3-graphviz';

// Types
import { Simulation } from '@/_private/types/lib/simulationTypes';

// Actions
import simulationActionCreators from '@/_private/lib/actions/simulationActions';

// Reducers
import simulationReducer from '@/_private/lib/reducers/simulationReducer';

export default function Graphviz(
  { params: { id } }:
  { params: { id: string } },
) {
  const ref = useRef(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [simulations, dispatchSimulation] = useReducer(simulationReducer, []);

  useEffect(() => {
    simulationActionCreators.readAllSimulations(dispatchSimulation);
  }, []);

  const selectedSimulation: Simulation | undefined = useMemo(() => simulations.find(
    (simulation: Simulation): boolean => (simulation.id === id),
  ), [simulations, id]);

  useEffect(() => {
    if (selectedSimulation) {
      const { scripts: { localCreateWorkflow: { graphvizData } } }: Simulation = selectedSimulation;
      graphvizData ? graphviz(ref.current).renderDot(graphvizData) : router.push(`/simulation/${id}`);
    }
    setLoading(false);
  }, [selectedSimulation]);

  if (!loading && !selectedSimulation) return notFound();

  return <div ref={ref} />;
}
