/* eslint-disable max-len */

'use client';

import React, {
  useEffect, useMemo, useReducer,
} from 'react';

// Components
import Table from '@/_components/table/Table';
import Form from '@/_components/form/Form';
import Details from '@/_components/details/Details';

// Types
import { Simulation, SimulationsUseReducer } from '@/_types/components/simulationTypes';
import { TableUseReducer } from '@/_types/components/tableTypes';
import { FormUseReducer } from '@/_types/components/formTypes';

// Actions
import simulationActionCreators from '@/_lib/actions/simulationActions';

// Reducers
import simulationReducer from '@/_lib/reducers/simulationReducer';
import formReducer from '@/_lib/reducers/formReducer';
import tableReducer from '@/_lib/reducers/tableReducer';

// Constants
import INITIAL_FORM from '@/_lib/constants/formConstants';
import { INITIAL_TABLE } from '@/_lib/constants/tableConstants';

export default function Dashboard() {
  const [simulations, dispatchSimulation]: SimulationsUseReducer = useReducer(simulationReducer, []);
  const [form, dispatchForm]: FormUseReducer = useReducer(formReducer, INITIAL_FORM);
  const [table, dispatchTable]: TableUseReducer = useReducer(tableReducer, INITIAL_TABLE);

  const selectedSimulation: Simulation | null = useMemo(() => ((!table.selectedKey.has(''))
    ? simulations.find(
      (simulation: Simulation): boolean => (table.selectedKey.has(simulation.id)),
    ) || null
    : null), [table.selectedKey, simulations]);

  useEffect(() => {
    simulationActionCreators.readAllSimulation(dispatchSimulation);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="basis-3/5 h-screen overflow-x-hidden overflow-y-auto">
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

{ /* <div className="invisible basis-0 lg:visible lg:basis-1/3 2xl:basis-1/4 h-screen overflow-x-hidden overflow-y-auto">
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
</div> */ }
