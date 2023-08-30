import {
  Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Selection,
} from '@nextui-org/react';
import React from 'react';

// State
import tableActionCreators from '@/lib/state/actions/table';
import { STATUS } from '@/lib/state/constants/metadata';

// Utils
import { getStatusName } from '@/utils/getStatus';

// Types
import { Status } from '@/types/lib';
import { TopContentProps } from '@/types/components/timeline';

export default function TopContent({
  table,
  dispatchTable,
  filteredMetadata,
}: TopContentProps) {
  const handleStage = (): void => {
    tableActionCreators.updateSelectedKey(dispatchTable, new Set(['']));
  };

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
    <div className="flex flex-col gap-4">
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
        <Button color="primary" isDisabled={table.selectedKey.has('')} onClick={handleStage}>Add job</Button>
      </div>
      <div className="flex justify-between gap-4 text-small">
        <div>
          {filteredMetadata.length}
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
