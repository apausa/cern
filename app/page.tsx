'use client';

import React, { useReducer } from 'react';

// Components
import Table from '@/_components/dashboard/Table';
import DashboardHeader from './_components/dashboard/DashboardHeader';

// Constants
import { INITIAL_TABLE } from '@/_lib/constants/tableConstants';

// Types
import { TableUseReducer } from './_types/components/tableTypes';

// Reducers
import tableReducer from './_lib/reducers/tableReducer';

export default function Dashboard() {
  const [table, dispatchTable]: TableUseReducer = useReducer(tableReducer, INITIAL_TABLE);

  return (
    <>
      <DashboardHeader table={table} dispatchTable={dispatchTable} />
      <main className="p-4">
        <Table table={table} dispatchTable={dispatchTable} />
      </main>
    </>
  );
}

// @develop https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#examples

// const selectedSimulation: Simulation | null = useMemo(() => ((!table.selectedKey.has(''))
//   ? simulations.find(
//     (simulation: Simulation): boolean => (table.selectedKey.has(simulation.id)),
//   ) || null
//   : null), [table.selectedKey, simulations]);

/* <div className="invisible basis-0 lg:visible lg:basis-1/3 2xl
basis-1/4 h-screen overflow-x-hidden overflow-y-auto">
{
  <Details
    selectedSimulation={selectedSimulation}
    dispatchForm={dispatchForm}
    dispatchSimulation={dispatchSimulation}
    dispatchTable={dispatchTable}
  />
) : (

)}
</div> */
