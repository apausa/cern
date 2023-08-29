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
    case 'date': return (metadata.date);
    case 'options':
      return (
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light" size="sm">...</Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem>Save</DropdownItem>
            <DropdownItem>Recreate</DropdownItem>
            <DropdownItem>Run in WLCG</DropdownItem>
            <DropdownItem>Run locally</DropdownItem>
            <DropdownItem>Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    default: return null;
  }
}
