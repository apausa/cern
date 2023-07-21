/* eslint-disable max-len */

'use client';

import React, { useEffect, useReducer } from 'react';

import Build from '@/components/dashboard/Build';
import Test from '@/components/dashboard/Test';
import Deploy from '@/components/dashboard/Deploy';
import Header from '@/components/Header';

import dashboardReducer from '@/lib/reducers/dashboardReducer';
import dashboardConstants from '@/lib/constants/dashboardConstants';
import { createSimulation } from '@/lib/services/simulation';
import { connectWebSocket } from '@/lib/services/ws';

export default function Dashboard() {
  const [state, dispatch]: any = useReducer(dashboardReducer, []);
  const handleCreateSimulation = async (buildState: any) => {
    const simulation = await createSimulation(buildState);
    dispatch({ type: dashboardConstants.CREATE_SIMULATION, simulation });
  };

  useEffect(() => { connectWebSocket(); }, []);

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
