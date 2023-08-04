'use client';

import React, { useReducer } from 'react';

// Components
import Monitor from '@/components/dashboard/Monitor';
import Header from '@/components/Header';
import Build from '@/components/dashboard/build/Build';
import Run from '@/components/dashboard/Run';

// Lib
import { postSimulation, putSimulation } from '@/lib/services/dashboard';
import dashboardReducer from '@/lib/reducers/dashboard';

// Types
import {
  DashboardUseReducer,
  HandlePostSimulation,
  HandlePutSimulation,
  Simulation,
} from '@/types/dashboard';

// Utils
import setPending from '@/utils/setPending';

export default function Dashboard() {
  const [dashboardState, dispatch]: DashboardUseReducer = useReducer(dashboardReducer, []);

  const handlePutSimulation: HandlePutSimulation = async (simulation) => {
    const unresolvedSimulation: Simulation = setPending(simulation);
    dispatch({ type: 'UPDATE_SIMULATION', simulation: unresolvedSimulation });

    const resolvedSimulation: Simulation = await putSimulation(unresolvedSimulation);
    dispatch({ type: 'UPDATE_SIMULATION', simulation: resolvedSimulation });
  };

  const handlePostSimulation: HandlePostSimulation = async (event, buildState) => {
    event.preventDefault();

    const createdSimulation: Simulation = await postSimulation(buildState);
    dispatch({ type: 'CREATE_SIMULATION', simulation: createdSimulation });
  };

  return (
    <>
      <header className="fixed w-screen border-b-2 h-16 bg-white">
        <Header />
      </header>
      <main className="columns-1 md:columns-3">
        <Build
          handlePostSimulation={handlePostSimulation}
        />
        <Run
          dashboardState={dashboardState}
          handlePutSimulation={handlePutSimulation}
        />
        <Monitor />
      </main>
    </>
  );
}
