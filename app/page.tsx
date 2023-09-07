'use client';

import React, { useMemo, useReducer } from 'react';

// Components
import TableComponent from '@/(private)/_components/dashboard/Table';
import DashboardHeader from './(private)/_components/dashboard/DashboardHeader';

// Constants
import { INITIAL_TABLE } from '@/(private)/_lib/constants/tableConstants';

// Types
import { Table, TableUseReducer } from './(private)/_types/components/tableTypes';

// Reducers
import tableReducer from './(private)/_lib/reducers/tableReducer';
import { Simulation, UseReducer } from './(private)/_types/components/simulationTypes';
import simulationReducer from './(private)/_lib/reducers/simulationReducer';
import DashboardFooter from './(private)/_components/dashboard/DashboardFooter';
import { getStatusName } from './(private)/_utils/getStatus';

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
      : filteredSimulationByQuery.filter(({ gridScript: { scriptStatus } }: Simulation) => (
        Array.from(status).includes(getStatusName(scriptStatus))));
  }, [simulations, table]);

  return (
    <>
      <DashboardHeader table={table} dispatchTable={dispatchTable} />
      <main className="p-4 mb-auto">
        <TableComponent
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
