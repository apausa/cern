'use client';

import React, { useReducer } from 'react';

import Build from '@/components/dashboard/Build';
import Test from '@/components/dashboard/Test';
import Deploy from '@/components/dashboard/Deploy';
import Header from '@/components/Header';

import { createSimulation } from '@/state/actions/dashboardActions';
import dashboardReducer from '@/state/reducers/dashboardReducer';

export default function Dashboard() {
  const [state, dispatch]: any = useReducer(dashboardReducer, []);
  const handleCreateSimulation = (simulation: any) => { (createSimulation(dispatch, simulation)); };

  // useEffect(() => { dispatch(readAllSimulations()); }, []); @next

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
