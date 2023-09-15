import React, {
  useMemo, useCallback,
} from 'react';
import {
  Table, TableHeader, TableRow, TableCell, TableBody, TableColumn, SortDescriptor,
} from '@nextui-org/react';
import Link from 'next/link';

// Components
import CellContent from './content/CellContent';
import TopContent from './content/TopContent';

// Types
import { Column, TableAction, TableType } from '@/_private/types/lib/tableTypes';
import { Simulation } from '@/_private/types/lib/simulationTypes';

// Actions
import tableActionCreators from '@/_private/lib/actions/tableActions';

export default function DashboardMain(
  {
    table, dispatchTable, allItems,
  }: {
    table: TableType,
    dispatchTable: React.Dispatch<TableAction>,
    allItems: Simulation[],
  },
) {
  const currentPageItems = useMemo((): Simulation[] => {
    const { page: { rows, current } }: TableType = table;
    const start: number = (current - 1) * rows;

    return allItems.slice(start, start + rows);
  }, [allItems, table.page]);

  const onSortChange = useCallback((sortDescriptor: SortDescriptor) => {
    tableActionCreators.updateSortDescriptor(dispatchTable, sortDescriptor);
  }, []);

  const onSelectionChange = useCallback((keys: any) => {
    tableActionCreators.updateSelectedKey(dispatchTable, keys);
  }, []);

  return (
    <Table
      removeWrapper
      disallowEmptySelection
      aria-label="Monitor table"
      selectionMode="single"
      topContentPlacement="outside"
      defaultSelectedKeys={table.selectedKey}
      sortDescriptor={table.sortDescriptor}
      onSelectionChange={onSelectionChange}
      onSortChange={onSortChange}
      topContent={(
        <TopContent
          table={table}
          dispatchTable={dispatchTable}
          allItems={allItems}
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
                  key={simulation.id}
                  href={`/simulation/${simulation.id}`}
                  as={`/simulation/${simulation.id}`}
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
