import {
  Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
} from '@nextui-org/react';
import React from 'react';
import { getStatusColor, getStatusName } from '@/utils/getStatus';

export default function Cell({ metadata, column }: any) {
  switch (column) {
    case 'title': return (metadata.form.title);
    case 'number': return (1);
    case 'local status': return (
      <Chip variant="flat" color={getStatusColor(metadata.testScript.scriptStatus)}>
        {getStatusName(metadata.testScript.scriptStatus)}
      </Chip>
    );
    case 'wlcg status': return (
      <Chip variant="flat" color={getStatusColor(metadata.gridScript.scriptStatus)}>
        {getStatusName(metadata.gridScript.scriptStatus)}
      </Chip>
    );
    case 'actions':
      return (
        <div className="relative flex justify-end items-center gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button size="sm" variant="light">Options</Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>View</DropdownItem>
              <DropdownItem>Edit</DropdownItem>
              <DropdownItem>Delete</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    case 'date': return (metadata.date);
    default: return null;
  }
}
