import React, {
  useMemo, useEffect, useReducer, useCallback,
} from 'react';
import {
  Table, TableHeader, TableRow, TableCell, TableBody, TableColumn, SortDescriptor, Selection,
} from '@nextui-org/react';

// Components
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CellContent from './content/CellContent';
import TopContent from './content/TopContent';
import BottomContent from './content/BottomContent';

// Types
import { Column } from '@/(private)/_types/components/tableTypes';
import { Simulation, UseReducer } from '@/(private)/_types/components/simulationTypes';

// Utils
import { filterSimulation, getPageItems } from '@/(private)/_utils/table';

// Reducers
import simulationReducer from '@/(private)/_lib/reducers/simulationReducer';

// Actions
import tableActionCreators from '@/(private)/_lib/actions/tableActions';
import simulationActionCreators from '@/(private)/_lib/actions/simulationActions';

export default function TableComponent({ table, dispatchTable }: any) {
  const pathname: string = usePathname();
  const [simulations, dispatchSimulation]: UseReducer = useReducer(simulationReducer, []);

  const allPagesItems = useMemo((): Simulation[] => (
    filterSimulation(simulations, table.filter)
  ), [simulations, table.filter]);

  const currentPageItems = useMemo((): Simulation[] => (
    getPageItems(allPagesItems, table.page)
  ), [allPagesItems, table.page]);

  const onSortChange = useCallback((sortDescriptor: SortDescriptor) => {
    tableActionCreators.updateSortDescriptor(dispatchTable, sortDescriptor);
  }, []);

  const onSelectionChange = useCallback((keys: Selection) => {
    tableActionCreators.updateSelectedKey(dispatchTable, keys);
  }, []);

  useEffect(() => {
    simulationActionCreators.readAllSimulations(dispatchSimulation);
  }, [pathname]);

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
          allPagesItems={allPagesItems}
        />
        )}
      topContent={(
        <TopContent
          table={table}
          dispatchTable={dispatchTable}
          allPagesItems={allPagesItems}
        />
          )}
    >
      <TableHeader columns={table.selectedColumns}>
        {({ key, allowSorting }: Column) => (
          <TableColumn key={key} allowsSorting={allowSorting}>{key}</TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent="No jobs to display" items={currentPageItems}>
        {(simulation: Simulation) => (
          <TableRow>
            {(column) => (
              <TableCell key={`${simulation.id} ${column}`}>
                <Link key={simulation.id} href={`/simulation/${simulation.id}`}>
                  <CellContent simulation={simulation} column={column} />
                </Link>
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
