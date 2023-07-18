import React, { useReducer, useEffect } from 'react';

import Build from '@/components/dashboard/Build';
import Test from '@/components/dashboard/Test';
import Deploy from '@/components/dashboard/Deploy';
import Header from '@/components/Header';

import { createSimulation, readAllSimulations } from '@/state/actions/simulationActions';
import simulationReducer from '@/state/reducers/simulationReducer';

export default async function Dashboard() {
  const [state, dispatch]: any = useReducer(simulationReducer, []);
  const handleSubmit = () => { dispatch(createSimulation); };
  const handleChange = () => { dispatch(updateSimulation); };

  useEffect(() => { dispatch(readAllSimulations()); }, []);

  return (
    <>
      <header className="fixed w-screen border-b-2 h-16 bg-white">
        <Header />
      </header>
      <main className="columns-1 md:columns-3">
        <Build handleSubmit={handleSubmit} handleChange={handleChange} />
        <Test state={state} />
        <Deploy />
      </main>
    </>
  );
}
