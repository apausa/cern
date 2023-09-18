'use client';

import React, {
  useEffect, useReducer, useState,
} from 'react';

// Components
import { usePathname } from 'next/navigation';
import DashboardMain from '@/_private/components/dashboard/dashboardMain/DashboardMain';
import DashboardHeader from './_private/components/dashboard/DashboardHeader';
import DashboardFooter from './_private/components/dashboard/DashboardFooter';

// Constants
import { INITIAL_TABLE } from '@/_private/lib/constants/tableConstants';

// Reducers
import tableReducer from './_private/lib/reducers/tableReducer';
import simulationReducer from './_private/lib/reducers/simulationReducer';

// Types
import { Simulation, UseReducer } from './_private/types/lib/simulationTypes';
import { TableType, TableUseReducer } from './_private/types/lib/tableTypes';

// Actions
import simulationActionCreators from './_private/lib/actions/simulationActions';

export default function Dashboard() {
  const pathname: string = usePathname();
  const [table, dispatchTable]: TableUseReducer = useReducer(tableReducer, INITIAL_TABLE);
  const [simulations, dispatchSimulation]: UseReducer = useReducer(simulationReducer, []);
  const [allItems, setAllItems] = useState<Simulation[]>([]);

  useEffect(() => {
    if (pathname === '/') {
      simulationActionCreators.readAllSimulations(dispatchSimulation);
    }
  }, [pathname]);

  useEffect(() => {
    const { filter: { query, status } }: TableType = table;
    const filteredSimulationByQuery: Simulation[] = (query)
      ? simulations.filter(({ form: { title } }: Simulation) => (
        title.toLowerCase().includes(query.toLowerCase())))
      : simulations;

    setAllItems((status === 'all')
      ? [...filteredSimulationByQuery]
      : [...filteredSimulationByQuery.filter(
        ({ scripts: { gridRunWorkflow: { scriptStatus } } }: Simulation) => (
          Array.from(status).includes(scriptStatus)),
      )]);
  }, [simulations, table.filter]);

  useEffect(() => {
    setAllItems([...allItems.reverse()]);
  }, [table.sortDescriptor]);

  return (
    <>
      <DashboardHeader table={table} dispatchTable={dispatchTable} />
      <main className="p-4 mb-auto">
        <DashboardMain
          table={table}
          dispatchTable={dispatchTable}
          allItems={allItems}
        />
      </main>
      <DashboardFooter
        table={table}
        dispatchTable={dispatchTable}
        allItems={allItems}
      />
    </>
  );
}
