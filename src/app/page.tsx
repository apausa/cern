'use client';

import React, { useReducer } from 'react';

// Components
import Monitor from '@/components/dashboard/Monitor';
import Header from '@/components/Header';
import Build from '@/components/dashboard/build/Build';
import Run from '@/components/dashboard/Run';

// Lib
import { buildSimulation, runSimulation } from '@/lib/services/dashboard';
import dashboardReducer from '@/lib/reducers/dashboard';

// Types
import {
  DashboardUseReducer,
  HandleBuildSimulation,
  HandleRunSimulation,
  Simulation,
} from '@/types/dashboard';

export default function Dashboard() {
  const [dashboardState, dispatch]: DashboardUseReducer = useReducer(dashboardReducer, []);

  const handleBuildSimulation: HandleBuildSimulation = async (event, buildState) => {
    event.preventDefault();

    const createdSimulation: Simulation = await buildSimulation(buildState);
    dispatch({ type: 'CREATE_SIMULATION', simulation: createdSimulation });
  };

  const handleRunSimulation: HandleRunSimulation = async (event, simulation) => {
    event.preventDefault();

    // @develop change prodStatus to pending following backend logic
    const unresolvedSimulation: Simulation = { ...simulation, testStatus: 'PENDING' };
    dispatch({ type: 'UPDATE_SIMULATION', simulation: unresolvedSimulation });

    const resolvedSimulation: Simulation = await runSimulation(unresolvedSimulation);
    dispatch({ type: 'UPDATE_SIMULATION', simulation: resolvedSimulation });
  };

  return (
    <>
      <header className="fixed w-screen border-b-2 h-16 bg-white">
        <Header />
      </header>
      <main className="columns-1 md:columns-3">
        <Build
          handleBuildSimulation={handleBuildSimulation}
        />
        <Run
          dashboardState={dashboardState}
          handleRunSimulation={handleRunSimulation}
        />
        <Monitor />
      </main>
    </>
  );
}
