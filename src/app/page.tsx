/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import React, { useReducer } from 'react';

import Test from '@/components/dashboard/Test';
import Deploy from '@/components/dashboard/Deploy';
import Header from '@/components/Header';
import Build from '@/components/dashboard/build/Build';

import { createSimulation, updateSimulation } from '@/services/dashboard';

import dashboardReducer from '@/lib/reducers/dashboard';
import { DashboardAction } from '@/types/dashboard';

export default function Dashboard() {
  const [state, dispatch]: any = useReducer(dashboardReducer, []);

  const handleCreateSimulation = async (buildState: any) => {
    const simulation = await createSimulation(buildState);
    const createAction: DashboardAction = { type: 'CREATE_SIMULATION', simulation };

    dispatch(createAction);

    return simulation;
  };

  const handleUpdateSimulation = async (a: any) => {
    const simulation = await updateSimulation(a);
    const updateAction: any = { type: 'UPDATE_SIMULATION', simulation };

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
        <Test state={state} />
        <Deploy />
      </main>
    </>
  );
}
