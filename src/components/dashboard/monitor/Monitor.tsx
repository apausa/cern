import React from 'react';
import {
  Table, TableHeader, TableRow, TableCell, TableBody, Divider, TableColumn, Chip,
} from '@nextui-org/react';

import { Metadata } from '@/types/dashboard';
import { MonitorProps } from '@/types/monitor';

export default function Monitor({ allMetadata, selectedKey, setSelectedKey }: MonitorProps) {
  return (
    <>
      <header className="p-4">
        Job list
      </header>
      <Divider />
      <main className="p-4">
        <Table
          removeWrapper
          selectionMode="single"
          color="primary"
          aria-label="Monitor table"
          selectedKeys={selectedKey}
          onSelectionChange={setSelectedKey}
        >
          <TableHeader>
            <TableColumn>Title</TableColumn>
            <TableColumn>Local status</TableColumn>
            <TableColumn>WLCG status</TableColumn>
            <TableColumn>Date</TableColumn>
          </TableHeader>
          <TableBody emptyContent="No jobs to display">
            {allMetadata.map((metadata: Metadata) => (
              <TableRow key={metadata.id}>
                <TableCell>{metadata.form.title}</TableCell>
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
                <TableCell>{metadata.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>

    </>
  );
}
