'use client';

import React, { useReducer } from 'react';

import Test from '@/components/dashboard/Test';
import Deploy from '@/components/dashboard/Deploy';
import Header from '@/components/Header';
import Build from '@/components/dashboard/build/Build';

import dashboardReducer from '@/lib/reducers/dashboardReducer';
import { createSimulation } from '@/lib/services/simulation';
import DashboardAction from '@/types/components/dashboard/dashboard';
import { BashScript } from '@/types/components/dashboard/build';

export default function Dashboard() {
  const [state, dispatch]: any = useReducer(dashboardReducer, []);

  const handleCreateSimulation = async (buildState: BashScript) => {
    const simulation = await createSimulation(buildState);
    const action: DashboardAction = { type: 'CREATE_SIMULATION', simulation };

    dispatch(action);
  };

  return (
    <>
      <header className="fixed w-screen border-b-2 h-16 bg-white">
        <Header />
      </header>
      <main className="columns-1 md:columns-3">
        <Build handleCreateSimulation={handleCreateSimulation} />
        <Test state={state} />
        <Deploy />
      </main>
    </>
  );
}
