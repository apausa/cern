import {
  Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
} from '@nextui-org/react';
import React from 'react';

// Utils
import { getStatusColor, getStatusName } from '@/utils/getStatus';

// Types
import { CellProps } from '@/types/components/timeline';

export default function CellContent({ metadata, column }: CellProps) {
  switch (column) {
    case 'Title': return (metadata.form.title);
    case 'Number': return (1);
    case 'Local status': return (
      <Chip variant="flat" color={getStatusColor(metadata.testScript.scriptStatus)}>
        {getStatusName(metadata.testScript.scriptStatus)}
      </Chip>
    );
    case 'WLCG status': return (
      <Chip variant="flat" color={getStatusColor(metadata.gridScript.scriptStatus)}>
        {getStatusName(metadata.gridScript.scriptStatus)}
      </Chip>
    );
    case 'Date': return (metadata.date);
    case 'Options':
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
