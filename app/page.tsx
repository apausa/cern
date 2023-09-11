'use client';

import React, { useMemo, useReducer } from 'react';

// Components
import DashboardTable from '@/_private/components/dashboard/dashboardTable/DashboardTable';
import DashboardHeader from './_private/components/dashboard/DashboardHeader';

// Constants
import { INITIAL_TABLE } from '@/_private/lib/constants/tableConstants';

// Types
import { Table, TableUseReducer } from './_private/types/components/tableTypes';

// Reducers
import tableReducer from './_private/lib/reducers/tableReducer';
import { Simulation, UseReducer } from './_private/types/components/simulationTypes';
import simulationReducer from './_private/lib/reducers/simulationReducer';
import DashboardFooter from './_private/components/dashboard/DashboardFooter';
import { getStatusName } from './_private/utils/getStatus';

export default function Dashboard() {
  const [table, dispatchTable]: TableUseReducer = useReducer(tableReducer, INITIAL_TABLE);
  const [simulations, dispatchSimulation]: UseReducer = useReducer(simulationReducer, []);

  const allPagesItems = useMemo((): Simulation[] => {
    const { filter: { query, status } }: Table = table;
    const filteredSimulationByQuery = (query)
      ? simulations.filter(({ form: { title } }: Simulation) => (
        title.toLowerCase().includes(query.toLowerCase())))
      : simulations;

    return (status === 'all')
      ? filteredSimulationByQuery
      : filteredSimulationByQuery.filter(
        ({ scripts: { gridRunWorkflow: { scriptStatus } } }: Simulation) => (
          Array.from(status).includes(getStatusName(scriptStatus))),
      );
  }, [simulations, table]);

  return (
    <>
      <DashboardHeader table={table} dispatchTable={dispatchTable} />
      <main className="p-4 mb-auto">
        <DashboardTable
          table={table}
          dispatchTable={dispatchTable}
          dispatchSimulation={dispatchSimulation}
          allPagesItems={allPagesItems}
        />
      </main>
      <DashboardFooter
        table={table}
        dispatchTable={dispatchTable}
        allPagesItems={allPagesItems}
      />
    </>
  );
}
