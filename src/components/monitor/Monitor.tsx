import React, { useEffect, useState } from 'react';
import {
  Table, TableHeader, TableRow, TableCell, TableBody, Divider, TableColumn, Chip, Button,
} from '@nextui-org/react';

import { Metadata } from '@/types/lib';
import { MonitorProps } from '@/types/components/monitor';

export default function Monitor({
  allMetadata, selectedMetadata, setSelectedMetadata,
}: MonitorProps) {
  const [selectedKey, setSelectedKey]: any = useState(new Set(['']));

  useEffect(() => {
    if (!selectedKey.has('') && allMetadata.length !== 0) {
      const foundMetadata = allMetadata.find(
        (metadata: Metadata): Metadata => (selectedKey.has(metadata.id)),
      );
      setSelectedMetadata(foundMetadata || null);
    }
  }, [selectedKey]);

  const returnStatus = (status: string | null): string => {
    switch (status) {
      case 'PENDING': return 'Running';
      case 'FULFILLED': return 'Completed';
      case 'REJECTED': return 'Error';
      case null: return 'Staged';
      default: return '';
    }
  };

  const returnColor = (status: string | null): 'warning' | 'success' | 'danger' | 'default' => {
    switch (status) {
      case 'PENDING': return 'warning';
      case 'FULFILLED': return 'success';
      case 'REJECTED': return 'danger';
      default: return 'default';
    }
  };

  const handleClick = (): void => {
    setSelectedMetadata(null);
  };

  return (
    <>
      <header className="flex justify-between p-4">
        <div>Job list</div>
        <Button color="primary" isDisabled={selectedMetadata === null} onClick={handleClick}>Add</Button>
      </header>
      <Divider />
      <main className="p-4">
        <Table
          removeWrapper
          selectionMode="single"
          aria-label="Monitor table"
          selectedKeys={selectedKey}
          onSelectionChange={setSelectedKey}
          onSortChange={() => {}}
        >
          <TableHeader>
            <TableColumn>Title</TableColumn>
            <TableColumn>Local status</TableColumn>
            <TableColumn>WLCG status</TableColumn>
            <TableColumn allowsSorting>Date</TableColumn>
          </TableHeader>
          <TableBody emptyContent="No jobs to display">
            {allMetadata.map((metadata: Metadata) => (
              <TableRow key={metadata.id}>
                <TableCell>{metadata.form.title}</TableCell>
                <TableCell>
                  <Chip variant="flat" color={returnColor(metadata.testScript.scriptStatus)}>
                    {returnStatus(metadata.testScript.scriptStatus)}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Chip variant="flat" color={returnColor(metadata.prodScript.scriptStatus)}>
                    {returnStatus(metadata.prodScript.scriptStatus)}
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
