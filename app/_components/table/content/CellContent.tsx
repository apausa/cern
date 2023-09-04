import {
  Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
} from '@nextui-org/react';
import React from 'react';

// Utils
import { getStatusColor, getStatusName } from '@/_utils/getStatus';

// Types
import { CellProps } from '@/_types/components/tableTypes';

export default function CellContent({ simulation, column }: CellProps) {
  switch (column) {
    case 'Title': return (simulation.form.title);
    case 'Number': return (1);
    case 'Local status': return (
      <Chip variant="flat" color={getStatusColor(simulation.testScript.scriptStatus)}>
        {getStatusName(simulation.testScript.scriptStatus)}
      </Chip>
    );
    case 'WLCG status': return (
      <Chip variant="flat" color={getStatusColor(simulation.gridScript.scriptStatus)}>
        {getStatusName(simulation.gridScript.scriptStatus)}
      </Chip>
    );
    case 'Date': return (simulation.date);
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
