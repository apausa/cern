import {
  Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Selection,
} from '@nextui-org/react';
import React, { useCallback } from 'react';
import Link from 'next/link';

// Actions
import tableActionCreators from '@/_private/lib/actions/tableActions';

// Constants
import { STATUS } from '@/_private/lib/constants/simulationConstants';

// Types
import { Status } from '@/_private/types/utils';
import { TableAction, TableType } from '@/_private/types/lib/tableTypes';

export default function DashboardHeader(
  {
    table, dispatchTable,
  }: {
    table: TableType,
    dispatchTable: React.Dispatch<TableAction>
  },
) {
  const onClear = useCallback((): void => {
    tableActionCreators.updateFilterQuery(dispatchTable, '');
    tableActionCreators.updatePageCurrent(dispatchTable, 1);
  }, []);

  const onValueChange = useCallback((query: string) => {
    tableActionCreators.updateFilterQuery(dispatchTable, query);
    tableActionCreators.updatePageCurrent(dispatchTable, 1);
  }, []);

  const onSelectionChange = useCallback((status: Selection) => {
    tableActionCreators.updateFilterStatus(dispatchTable, status);
  }, []);

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
            <DropdownItem key={status}>
              {status}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <Button
        href="/configuration"
        as={Link}
        color="primary"
      >
        Add job
      </Button>
    </div>
  );
}
