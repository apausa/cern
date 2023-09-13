import React, {
  useMemo, useEffect, useCallback,
} from 'react';
import {
  Table, TableHeader, TableRow, TableCell, TableBody, TableColumn, SortDescriptor,
} from '@nextui-org/react';

// Components
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import CellContent from './content/CellContent';
import TopContent from './content/TopContent';

// Types
import { Column, TableAction, TableType } from '@/_private/types/lib/tableTypes';
import { Simulation, SimulationAction } from '@/_private/types/lib/simulationTypes';

// Actions
import tableActionCreators from '@/_private/lib/actions/tableActions';
import simulationActionCreators from '@/_private/lib/actions/simulationActions';

export default function DashboardMain(
  {
    table, dispatchTable, allPagesItems, dispatchSimulation,
  }: {
    table: TableType,
    dispatchTable: React.Dispatch<TableAction>,
    allPagesItems: Simulation[],
    dispatchSimulation: React.Dispatch<SimulationAction>,
  },
) {
  const pathname: string = usePathname();

  const currentPageItems = useMemo((): Simulation[] => {
    const { page: { rows, current } } = table;
    const start = (current - 1) * rows;

    return allPagesItems.slice(start, start + rows);
  }, [allPagesItems, table.page]);

  const onSortChange = useCallback((sortDescriptor: SortDescriptor) => {
    tableActionCreators.updateSortDescriptor(dispatchTable, sortDescriptor);
  }, []);

  const onSelectionChange = useCallback((keys: any) => {
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
      topContentPlacement="outside"
      selectedKeys={table.selectedKey}
      sortDescriptor={table.sortDescriptor}
      onSelectionChange={onSelectionChange}
      onSortChange={onSortChange}
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
            {(columnKey) => (
              <TableCell key={`${simulation.id} ${columnKey}`}>
                <Link
                  as={`/simulation/${simulation.id}`}
                  key={simulation.id}
                  href={`/simulation/${simulation.id}`}
                >
                  <CellContent simulation={simulation} columnKey={columnKey} />
                </Link>
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
