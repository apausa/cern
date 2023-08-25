import React, { useEffect, useState } from 'react';
import {
  Table, TableHeader, TableRow, TableCell, TableBody, TableColumn, Chip, Button,
} from '@nextui-org/react';

import { Metadata } from '@/types/lib';
import { MonitorProps } from '@/types/components/monitor';
import { getStatusColor, getStatusName } from '@/utils/getStatus';

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
  }, [selectedKey, allMetadata]);

  const handleClick = (): void => {
    setSelectedMetadata(null);
  };

  return (
    <>
      <header className="flex justify-between p-4 border-b border-b-neutral-800">
        <div className="pt-2">Job list</div>
        <Button color="primary" isDisabled={selectedMetadata === null} onClick={handleClick}>Add</Button>
      </header>
      <main className="px-4 border-b border-b-neutral-800">
        <Table
          removeWrapper
          className="py-4"
          selectionMode="single"
          aria-label="Monitor table"
          selectedKeys={selectedKey}
          onSelectionChange={setSelectedKey}
          onSortChange={() => {}}
          disallowEmptySelection
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
                  <Chip variant="flat" color={getStatusColor(metadata.testScript.scriptStatus)}>
                    {getStatusName(metadata.testScript.scriptStatus)}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Chip variant="flat" color={getStatusColor(metadata.prodScript.scriptStatus)}>
                    {getStatusName(metadata.prodScript.scriptStatus)}
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
