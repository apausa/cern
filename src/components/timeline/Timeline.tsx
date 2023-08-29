import React, { useMemo } from 'react';
import {
  Table, TableHeader, TableRow, TableCell, TableBody, TableColumn, SortDescriptor,
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

export default function Timeline({
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

  const handleUpdateSortDescriptor = (sortDescriptor: SortDescriptor) => {
    tableActionCreators.updateSortDescriptor(dispatchTable, sortDescriptor);
  };

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
          bottomContent={Math.ceil(filteredMetadata.length / table.page.rows) > 1 && (
          <BottomContent
            table={table}
            dispatchTable={dispatchTable}
            filteredMetadata={filteredMetadata}
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
              filteredMetadata={filteredMetadata}
            />
          )}
          topContentPlacement="outside"
          sortDescriptor={table.sortDescriptor}
          onSortChange={handleUpdateSortDescriptor}
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
