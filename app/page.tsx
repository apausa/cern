/* eslint-disable max-len */

'use client';

import React, {
  useEffect, useReducer,
} from 'react';

// Components
import Table from '@/_components/table/Table';

// Types
import { SimulationsUseReducer } from '@/_types/components/simulationTypes';
import { TableUseReducer } from '@/_types/components/tableTypes';

// Actions
import simulationActionCreators from '@/_lib/actions/simulationActions';

// Reducers
import simulationReducer from '@/_lib/reducers/simulationReducer';
import tableReducer from '@/_lib/reducers/tableReducer';

// Constants
import { INITIAL_TABLE } from '@/_lib/constants/tableConstants';

export default function Dashboard() {
  const [simulations, dispatchSimulation]: SimulationsUseReducer = useReducer(simulationReducer, []);
  const [table, dispatchTable]: TableUseReducer = useReducer(tableReducer, INITIAL_TABLE);

  useEffect(() => {
    simulationActionCreators.readAllSimulations(dispatchSimulation);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="basis-1/2 h-screen overflow-x-hidden overflow-y-auto">
        <Table
          simulations={simulations}
          table={table}
          dispatchTable={dispatchTable}
        />
      </div>
    </div>
  );
}

// @develop https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#examples

// const [form, dispatchForm]: FormUseReducer = useReducer(formReducer, INITIAL_FORM);
// const selectedSimulation: Simulation | null = useMemo(() => ((!table.selectedKey.has(''))
//   ? simulations.find(
//     (simulation: Simulation): boolean => (table.selectedKey.has(simulation.id)),
//   ) || null
//   : null), [table.selectedKey, simulations]);

/* <div className="invisible basis-0 lg:visible lg:basis-1/3 2xl:basis-1/4 h-screen overflow-x-hidden overflow-y-auto">
{selectedSimulation ? (
  <Details
    selectedSimulation={selectedSimulation}
    dispatchForm={dispatchForm}
    dispatchSimulation={dispatchSimulation}
    dispatchTable={dispatchTable}
  />
) : (
  <Form
    form={form}
    dispatchForm={dispatchForm}
    dispatchSimulation={dispatchSimulation}
  />
)}
</div> */
