'use client';

import React, { useReducer } from 'react';

import Test from '@/components/dashboard/Test';
import Deploy from '@/components/dashboard/Deploy';
import Header from '@/components/Header';
import Build from '@/components/dashboard/build/Build';

import { createSimulation, updateSimulation } from '@/lib/services/dashboard';

import dashboardReducer from '@/lib/reducers/dashboard';
import {
  DashboardCreateAction, DashboardUpdateAction, DashboardUseReducer, Simulation,
} from '@/types/dashboard';
import { BashScript } from '@/types/build';

export default function Dashboard() {
  const [dashboardState, dispatch]: DashboardUseReducer = useReducer(dashboardReducer, []);

  const handleCreateSimulation = async (buildState: BashScript): Promise<Simulation> => {
    const simulation: Simulation = await createSimulation(buildState);
    const createAction: DashboardCreateAction = { type: 'CREATE_SIMULATION', simulation };

    dispatch(createAction);

    return simulation;
  };

  const handleUpdateSimulation = async (createdSimulation: Simulation): Promise<Simulation> => {
    const simulation: Simulation = await updateSimulation(createdSimulation);
    const updateAction: DashboardUpdateAction = { type: 'UPDATE_SIMULATION', simulation };

    dispatch(updateAction);

    return simulation;
  };

  return (
    <>
      <header className="fixed w-screen border-b-2 h-16 bg-white">
        <Header />
      </header>
      <main className="columns-1 md:columns-3">
        <Build
          handleCreateSimulation={handleCreateSimulation}
          handleUpdateSimulation={handleUpdateSimulation}
        />
        <Test dashboardState={dashboardState} />
        <Deploy />
      </main>
    </>
  );
}
