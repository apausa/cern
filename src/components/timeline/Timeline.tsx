import React, { useMemo } from 'react';
import {
  Table, TableHeader, TableRow, TableCell, TableBody, TableColumn,
} from '@nextui-org/react';

// Types
import { Column, Metadata } from '@/types/lib';
import { MonitorProps } from '@/types/components/timeline';

// Actions
import tableActionCreators from '@/lib/state/actions/table';

// Components
import Cell from './Cell';
import TopContent from './content/TopContent';
import BottomContent from './content/BottomContent';

// Hooks
import { filterMetadata, getColumns, getPageMetadata } from '@/lib/hooks/timeline';

export default function Monitor({
  allMetadata, table, dispatchTable,
}: MonitorProps) {
  const columns: Column[] = useMemo(
    () => getColumns(table.selectedColumns),
    [table.selectedColumns],
  );

  const filteredMetadata: Metadata[] = useMemo(
    () => filterMetadata(allMetadata, table.filter),
    [allMetadata, table.filter],
  );

  const pageMetadata: Metadata[] = useMemo(
    () => getPageMetadata(filteredMetadata, table.page),
    [filteredMetadata, table.page],
  );

  return (
    <>
      <header className="flex justify-between py-5 px-4 border-b border-b-neutral-800">
        <div className="pt-2">Job list</div>
      </header>
      <main className="px-4 border-b border-b-neutral-800">
        <Table
          aria-label="Monitor table"
          removeWrapper
          className="py-4"
          bottomContent={(
            <BottomContent
              table={table}
              dispatchTable={dispatchTable}
              filteredMetadata={filteredMetadata}
            />
          )}
          bottomContentPlacement="outside"
          selectionMode="single"
          selectedKeys={table.selectedKey}
          onSelectionChange={(key) => tableActionCreators.updateSelectedKey(dispatchTable, key)}
          topContent={(
            <TopContent
              table={table}
              dispatchTable={dispatchTable}
              filteredMetadata={filteredMetadata}
            />
          )}
          topContentPlacement="outside"
        >

          <TableHeader columns={columns}>
            {({ key, title, allowSorting }: Column) => (
              <TableColumn key={key} allowsSorting={allowSorting}>
                {title}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent="No jobs to display" items={pageMetadata}>
            {(metadata: Metadata) => (
              <TableRow key={metadata.id}>
                {(column) => (<TableCell><Cell metadata={metadata} column={column} /></TableCell>)}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </main>
    </>
  );
}
