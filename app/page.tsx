'use client';

import React, { useReducer } from 'react';

// Components
import Table from '@/(private)/_components/dashboard/Table';
import DashboardHeader from './(private)/_components/dashboard/DashboardHeader';

// Constants
import { INITIAL_TABLE } from '@/(private)/_lib/constants/tableConstants';

// Types
import { TableUseReducer } from './(private)/_types/components/tableTypes';

// Reducers
import tableReducer from './(private)/_lib/reducers/tableReducer';

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
