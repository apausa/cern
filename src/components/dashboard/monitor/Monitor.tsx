'use client';

import React from 'react';
import {
  Table, TableHeader, TableRow, TableCell, TableBody, Divider, TableColumn, Chip,
} from '@nextui-org/react';

import { Metadata } from '@/types/dashboard';

export default function Monitor({ allMetadata, selectedKey, setSelectedKey }: any) {
  return (
    <>
      <header className="p-4">
        Monitor
      </header>
      <Divider />
      <main className="p-4">
        <Table
          removeWrapper
          disallowEmptySelection
          selectionMode="single"
          color="primary"
          aria-label="Monitor table"
          selectedKeys={selectedKey}
          onSelectionChange={setSelectedKey}
        >
          <TableHeader>
            <TableColumn>Author</TableColumn>
            <TableColumn>Title</TableColumn>
            <TableColumn>Test status</TableColumn>
            <TableColumn>Prod status</TableColumn>
            <TableColumn>Date</TableColumn>
          </TableHeader>
          <TableBody emptyContent="No simulations to display">
            {allMetadata.map((metadata: Metadata) => (
              <TableRow key={metadata.id}>
                <TableCell>Author</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>
                  <Chip>
                    {(metadata.testScript.scriptStatus === null) ? 'Ready' : metadata.testScript.scriptStatus}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Chip>
                    {(metadata.testScript.scriptStatus !== 'FULFILLED')
                      ? 'Not ready'
                      : (metadata.prodScript.scriptStatus === null) ? 'Ready' : metadata.prodScript.scriptStatus}
                  </Chip>
                </TableCell>
                <TableCell>{metadata.form.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>

    </>
  );
}
