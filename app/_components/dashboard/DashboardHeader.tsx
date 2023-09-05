import {
  Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Link, Selection,
} from '@nextui-org/react';
import React from 'react';

// State
import tableActionCreators from '@/_lib/actions/tableActions';
import { STATUS } from '@/_lib/constants/simulationConstants';

// Utils
import { getStatusName } from '@/_utils/getStatus';

// Types
import { TopContentProps } from '@/_types/components/tableTypes';
import { Status } from '@/_types/utils';

export default function Header({
  table,
  dispatchTable,
}: TopContentProps) {
  const onClear = (): void => {
    tableActionCreators.updateFilterQuery(dispatchTable, '');
    tableActionCreators.updatePageCurrent(dispatchTable, 1);
  };

  const onValueChange = (value: string) => {
    tableActionCreators.updateFilterQuery(dispatchTable, value);
    tableActionCreators.updatePageCurrent(dispatchTable, 1);
  };

  const onSelectionChange = (keys: Selection) => {
    tableActionCreators.updateFilterStatus(dispatchTable, keys);
  };

  return (
    <div className="p-4 border-b border-b-neutral-800 flex justify-between gap-4">
      <Input
        isClearable
        placeholder="Search name"
        value={table.filter.query}
        onClear={onClear}
        onValueChange={onValueChange}
      />
      <Dropdown>
        <DropdownTrigger>
          <Button>
            Filter status
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Table Status"
          closeOnSelect={false}
          selectedKeys={table.filter.status}
          selectionMode="multiple"
          onSelectionChange={onSelectionChange}
        >
          {STATUS.map((status: Status) => (
            <DropdownItem key={getStatusName(status)}>
              {getStatusName(status)}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      {/* @develop */}
      <Button
        href="/build"
        as={Link} // @develop
        color="primary"
      >
        Add job
      </Button>
    </div>
  );
}
