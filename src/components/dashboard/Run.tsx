'use client';

import React from 'react';
import { RunProps } from '@/types/run';
import { Simulation } from '@/types/dashboard';

export default function Run({ dashboardState, handlePutSimulation }: RunProps) {
  const isDisabled = (simulation: Simulation): boolean => (
    (simulation.testStatus !== 'FULFILLED' && simulation.prodStatus === null)
    || (simulation.testStatus === 'FULFILLED' && simulation.prodStatus !== null)
  );

  return (
    <div className="pt-20 pl-4 h-screen border-l-2">
      <h2 className="font-bold">Run</h2>
      <ul>
        {dashboardState && dashboardState.map((simulation: Simulation, index: number) => (
          <li key={`${index}`}>
            <div>{simulation.id}</div>
            <button
              type="button"
              disabled={simulation.testStatus !== null}
              onClick={() => { handlePutSimulation(simulation); }}
            >
              [BUTTON] Run in test environment

            </button>
            <div>
              Test status  →
              {' '}
              {simulation.testStatus}
            </div>
            <br />
            <button
              type="button"
              disabled={isDisabled(simulation)}
              onClick={() => { handlePutSimulation(simulation); }}
            >
              [BUTTON] Run in production environment

            </button>
            <div>
              Prod status  →
              {' '}
              {simulation.prodStatus}
            </div>
            <br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}
