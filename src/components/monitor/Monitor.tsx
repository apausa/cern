import React, { useEffect, useState } from 'react';
import {
  Table, TableHeader, TableRow, TableCell, TableBody, Divider, TableColumn, Chip,
} from '@nextui-org/react';

import { Metadata } from '@/types/lib';
import { MonitorProps } from '@/types/components/monitor';

export default function Monitor({ allMetadata, setSelectedMetadata }: MonitorProps) {
  const [selectedKey, setSelectedKey]: any = useState(new Set(['']));

  useEffect(() => {
    if (!selectedKey.has('') && allMetadata.length !== 0) {
      setSelectedMetadata(
        allMetadata.find((metadata: Metadata): Metadata => (selectedKey.has(metadata.id))),
      );
    }
  }, [selectedKey]);

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
