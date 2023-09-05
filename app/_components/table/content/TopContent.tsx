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

export default function TopContent({
  table,
  dispatchTable,
  filteredSimulation,
}: TopContentProps) {
  const onClear = (): void => {
    tableActionCreators.updateFilterQuery(dispatchTable, '');
    tableActionCreators.updatePageCurrent(dispatchTable, 1);
  };

  const onValueChange = (value: string) => {
    tableActionCreators.updateFilterQuery(dispatchTable, value);
    tableActionCreators.updatePageCurrent(dispatchTable, 1);
  };

  const onChange = (event: any) => {
    tableActionCreators.updatePageRows(dispatchTable, Number(event.target.value));
    tableActionCreators.updatePageCurrent(dispatchTable, 1);
  };

  const handleUpdateFilterStatus = (keys: Selection) => {
    tableActionCreators.updateFilterStatus(dispatchTable, keys);
  };

  return (
    <div className="pt-2 flex flex-col gap-4">
      <div className="flex justify-between gap-4">
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
            onSelectionChange={handleUpdateFilterStatus}
          >
            {STATUS.map((status: Status) => (
              <DropdownItem key={getStatusName(status)}>
                {getStatusName(status)}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Button
          color="primary"
          as={Link}
          href="/build"
        >
          Add job
        </Button>
      </div>
      <div className="flex justify-between gap-4 text-small">
        <div>
          {filteredSimulation.length}
          {' '}
          total jobs
        </div>
        <div className="flex items-center">
          Jobs per page
          <select
            className="bg-transparent outline-none"
            onChange={onChange}
            defaultValue={table.page.rows}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
          </select>
        </div>
      </div>
    </div>
  );
}
