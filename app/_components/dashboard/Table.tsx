import React, { useMemo, useEffect, useReducer } from 'react';
import {
  Table, TableHeader, TableRow, TableCell, TableBody, TableColumn, SortDescriptor, Selection,
} from '@nextui-org/react';

// Components
import CellContent from './content/CellContent';
import TopContent from './content/TopContent';
import BottomContent from './content/BottomContent';

// Types
import { Column } from '@/_types/components/tableTypes';
import { Simulation, UseReducer } from '@/_types/components/simulationTypes';

// Utils
import { filterSimulation, getPageItems } from '@/_utils/table';

// Reducers
import simulationReducer from '@/_lib/reducers/simulationReducer';

// Actions
import tableActionCreators from '@/_lib/actions/tableActions';
import simulationActionCreators from '@/_lib/actions/simulationActions';

export default function TableComponent({ table, dispatchTable }: any) {
  const [simulations, dispatchSimulation]: UseReducer = useReducer(simulationReducer, []);
  useEffect(() => { simulationActionCreators.readAllSimulations(dispatchSimulation); }, []);

  const filteredSimulations: Simulation[] = useMemo(
    () => filterSimulation(simulations, table.filter),
    [simulations, table.filter],
  );

  const pageItems: Simulation[] = useMemo(
    () => getPageItems(filteredSimulations, table.page),
    [filteredSimulations, table.page],
  );

  const onSortChange = (sortDescriptor: SortDescriptor) => {
    tableActionCreators.updateSortDescriptor(dispatchTable, sortDescriptor);
  };

  const onSelectionChange = (keys: Selection) => {
    tableActionCreators.updateSelectedKey(dispatchTable, keys);
  };

  return (
    <Table
      removeWrapper
      disallowEmptySelection
      aria-label="Monitor table"
      selectionMode="single"
      bottomContentPlacement="outside"
      topContentPlacement="outside"
      selectedKeys={table.selectedKey}
      sortDescriptor={table.sortDescriptor}
      onSelectionChange={onSelectionChange}
      onSortChange={onSortChange}
      bottomContent={(
        <BottomContent
          table={table}
          dispatchTable={dispatchTable}
          filteredSimulations={filteredSimulations}
        />
        )}
      topContent={(
        <TopContent
          table={table}
          dispatchTable={dispatchTable}
          filteredSimulations={filteredSimulations}
        />
          )}
    >
      <TableHeader columns={table.selectedColumns}>
        {({ key, allowSorting }: Column) => (
          <TableColumn key={key} allowsSorting={allowSorting}>{key}</TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent="No jobs to display" items={pageItems}>
        {(simulation: Simulation) => (
          <TableRow key={simulation.id}>
            {(column) => (
              <TableCell><CellContent simulation={simulation} column={column} /></TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
