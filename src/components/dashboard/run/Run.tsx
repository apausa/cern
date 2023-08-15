'use client';

import React from 'react';
import { Simulation } from '@/types/dashboard';

export default function Run({ dashboardState, handleUpdateSimulation }: any) {
  const isDisabled = (simulation: Simulation): boolean => (
    (simulation.testStatus !== 'FULFILLED' && simulation.prodStatus === null)
    || (simulation.testStatus === 'FULFILLED' && simulation.prodStatus !== null)
  );

  return (
    <div>
      <h2 className="font-bold">Run</h2>
      <ul>
        {dashboardState && dashboardState.map((simulation: Simulation, index: number) => (
          <li key={`${index}`}>
            <br />
            <br />
            <div>{simulation.id}</div>
            <div>
              Test status  →
              {' '}
              {(simulation.testStatus === null) ? 'Ready' : simulation.testStatus}
            </div>
            <div>
              GRID status  →
              {' '}
              {(simulation.testStatus !== 'FULFILLED')
                ? 'Not ready'
                : (simulation.prodStatus === null) ? 'Ready' : simulation.prodStatus}
            </div>
            <br />
            <button
              type="button"
              disabled={isDisabled(simulation)}
              onClick={() => { handleUpdateSimulation(simulation); }}
            >
              [BUTTON] Run in GRID
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
