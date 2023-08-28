/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useEffect, useMemo, useReducer, useState,
} from 'react';
import {
  Table, TableHeader, TableRow, TableCell, TableBody, TableColumn, Chip,
} from '@nextui-org/react';

import { Metadata } from '@/types/lib';
import { MonitorProps } from '@/types/components/monitor';
import { getStatusColor, getStatusName } from '@/utils/getStatus';
import TopContent from './content/TopContent';
import BottomContent from './content/BottomContent';
import tableReducer from '@/lib/reducers/table';
import { ALL_COLUMNS, INITIAL_TABLE } from '@/lib/constants/table';
import tableActionCreators from '@/lib/actions/table';
import Cell from './Cell';

export default function Monitor({
  allMetadata, selectedMetadata, setSelectedMetadata,
}: MonitorProps) {
  const [table, dispatchTable] = useReducer(tableReducer, INITIAL_TABLE);

  const bottomContent = useMemo(() => {
    <BottomContent
      table={table}
      dispatchTable={dispatchTable}
    />;
  }, [table]);

  const topContent = useMemo(() => (
    <TopContent
      selectedMetadata={selectedMetadata}
      setSelectedMetadata={setSelectedMetadata}
      allMetadata={allMetadata}
      table={table}
      dispatchTable={dispatchTable}
    />
  ), [selectedMetadata, allMetadata, table]);

  const columns: any = useMemo(() => (
    (table.selectedColumns === 'all')
      ? ALL_COLUMNS
      : ALL_COLUMNS.filter((column: string) => Array.from(table.selectedColumns).includes(column))
  ), [table.selectedColumns]);

  const filteredMetadata: any = useMemo(() => {
    if (table.filterValue) {
      return allMetadata.filter(({ form: { title } }: Metadata) => (
        title.toLowerCase().includes(table.filterValue.toLowerCase())
      ));
    } if (table.statusFilter !== 'all') {
      return allMetadata.filter(({ gridScript: { scriptStatus } }: Metadata) => (
        Array.from(table.statusFilter).includes(scriptStatus)));
    } return [...allMetadata];
  }, [allMetadata, table.filterValue, table.statusFilter]);

  useEffect(() => {
    if (!table.selectedKey.has('') && allMetadata.length !== 0) {
      const foundMetadata = allMetadata.find(
        (metadata: Metadata): Metadata => (table.selectedKey.has(metadata.id)),
      );
      setSelectedMetadata(foundMetadata || null);
    }
  }, [table.selectedKey, allMetadata]);

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
          // bottomContent={bottomContent}
          // bottomContentPlacement="outside"
          selectionMode="single"
          selectedKeys={table.selectedKey}
          onSelectionChange={(key) => tableActionCreators.updateSelectedKey(dispatchTable, key)}
          // sortDescriptor={sortDescriptor}
          // onSortChange={setSortDescriptor}
          // topContent={topContent}
          // topContentPlacement="outside"
        >

          <TableHeader columns={columns}>
            {(column: string) => (
              <TableColumn key={column} allowsSorting={column === 'date'}>
                {column}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent="No jobs to display" items={filteredMetadata}>
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
