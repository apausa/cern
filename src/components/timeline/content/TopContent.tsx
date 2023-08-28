import {
  Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Selection,
} from '@nextui-org/react';
import React from 'react';
import { ALL_COLUMNS } from '@/lib/state/constants/table';
import tableActionCreators from '@/lib/state/actions/table';
import { getStatusName } from '@/utils/getStatus';
import { Status } from '@/types/lib';
import { STATUS } from '@/lib/state/constants/metadata';

export default function TopContent({
  table,
  dispatchTable,
  filteredMetadata,
}: any) {
  const handleStage = (): void => {
    tableActionCreators.updateSelectedKey(dispatchTable, '');
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

  const handleUpdateSelectedColumns = (keys: Selection) => {
    tableActionCreators.updateSelectedColumns(dispatchTable, keys);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-4">
        <Input
          isClearable
          placeholder="Search..."
          value={table.filter.query}
          onClear={onClear}
          onValueChange={onValueChange}
        />
        <Dropdown>
          <DropdownTrigger>
            <Button>
              Status
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Table Columns"
            closeOnSelect={false}
            selectedKeys={table.filter.status}
            selectionMode="multiple"
            onSelectionChange={handleUpdateFilterStatus}
          >
            {STATUS.map((status: Status) => (
              <DropdownItem key={getStatusName(status)} className="capitalize">
                {getStatusName(status)}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownTrigger>
            <Button>
              Columns
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Table Columns"
            closeOnSelect={false}
            selectedKeys={table.selectedColumns}
            selectionMode="multiple"
            onSelectionChange={handleUpdateSelectedColumns}
          >
            {ALL_COLUMNS.map((column: any) => (
              <DropdownItem key={column} className="capitalize">
                {column}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Button color="primary" isDisabled={table.selectedKey.has('')} onClick={handleStage}>Add job</Button>
      </div>
      <div className="flex justify-between gap-4 text-default-400 text-small">
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
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="16">16</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// (<span className="w-[30%] text-small text-default-400">
// {selectedKeys === 'all'
//   ? 'All items selected'
//   : `${selectedKeys.size} of ${filteredItems.length} selected`}
// </span>)
