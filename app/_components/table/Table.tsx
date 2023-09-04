import React, { useMemo } from 'react';
import {
  Table, TableHeader, TableRow, TableCell, TableBody, TableColumn, SortDescriptor,
} from '@nextui-org/react';

// Actions
import tableActionCreators from '@/_lib/actions/tableActions';

// Components
import CellContent from './content/CellContent';
import TopContent from './content/TopContent';
import BottomContent from './content/BottomContent';

// Types
import { Column, TimelineProps } from '@/_types/components/tableTypes';
import { Simulation } from '@/_types/components/simulationTypes';

// Utils
import { filterSimulation, getColumns, getPageSimulation } from '@/_utils/table';

export default function Timeline({
  simulations, table, dispatchTable,
}: TimelineProps) {
  const columns: Column[] = useMemo(
    () => getColumns(table.selectedColumns),
    [table.selectedColumns],
  );

  const filteredSimulation: Simulation[] = useMemo(
    () => filterSimulation(simulations, table.filter),
    [simulations, table.filter],
  );

  const pageSimulation: Simulation[] = useMemo(
    () => getPageSimulation(filteredSimulation, table.page),
    [filteredSimulation, table.page],
  );

  const handleUpdateSortDescriptor = (sortDescriptor: SortDescriptor) => {
    tableActionCreators.updateSortDescriptor(dispatchTable, sortDescriptor);
  };

  return (
    <>
      <header className="py-5 pl-4 lg:pl-8 pr-4 border-b border-b-neutral-800">
        <div className="pt-2">Job list</div>
      </header>
      <main className="pl-4 lg:pl-8 pr-4 pt-4">
        <Table
          aria-label="Monitor table"
          removeWrapper
          bottomContent={Math.ceil(filteredSimulation.length / table.page.rows) > 1 && (
          <BottomContent
            table={table}
            dispatchTable={dispatchTable}
            filteredSimulation={filteredSimulation}
          />
          )}
          bottomContentPlacement="outside"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={table.selectedKey}
          onSelectionChange={(key) => tableActionCreators.updateSelectedKey(dispatchTable, key)}
          topContent={(
            <TopContent
              table={table}
              dispatchTable={dispatchTable}
              filteredSimulation={filteredSimulation}
            />
          )}
          topContentPlacement="outside"
          sortDescriptor={table.sortDescriptor}
          onSortChange={handleUpdateSortDescriptor}
        >

          <TableHeader columns={columns}>
            {({ key, allowSorting }: Column) => (
              <TableColumn key={key} allowsSorting={allowSorting}>
                {key}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent="No jobs to display" items={pageSimulation}>
            {(simulation: Simulation) => (
              <TableRow key={simulation.id}>
                {(column) => (
                  <TableCell>
                    <CellContent simulation={simulation} column={column} />
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </main>
    </>
  );
}
