'use client';

import React from 'react';
import { RunProps } from '@/types/run';
import { Simulation } from '@/types/dashboard';

export default function Run({ dashboardState, handleRunSimulation }: RunProps) {
  return (
    <div className="pt-20 pl-4 h-screen border-l-2">
      <h2 className="font-bold">Run</h2>
      <ul>
        {dashboardState && dashboardState.map((simulation: Simulation, index: number) => (
          <li key={`${index}`}>
            <div>{simulation.id}</div>
            <button
              type="button"
              onClick={(event) => { handleRunSimulation(event, simulation); }}
              disabled={simulation.testStatus !== null}
            >
              [BUTTON] Run in test environment

            </button>
            <div>
              Test status  →
              {' '}
              {simulation.testStatus}
            </div>
            <button
              type="button"
              disabled={simulation.testStatus !== 'FULFILLED' && simulation.prodStatus !== null}
              onClick={(event) => { handleRunSimulation(event, simulation); }}
            >
              [BUTTON] Run in production environment

            </button>
            <div>
              Prod status  →
              {' '}
              {simulation.prodStatus}
            </div>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}
