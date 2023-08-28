import {
  Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input,
} from '@nextui-org/react';
import React from 'react';
import { ALL_STATUS, ALL_COLUMNS } from '@/lib/constants/table';

export default function TopContent({
  selectedMetadata,
  filterValue,
  visibleColumns,
  statusFilter,
  rowsPerPage,
  setSelectedMetadata,
  setPage,
  setFilterValue,
  setVisibleColumns,
  setStatusFilter,
  setRowsPerPage,
  allMetadata,
}: any) {
  const handleClick = (): void => {
    setSelectedMetadata(null);
  };

  const handleClear = (): void => {
    setFilterValue('');
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setFilterValue(value);
    setPage(1);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-4">
        <Input
          isClearable
          placeholder="Search..."
          value={filterValue}
          onClear={handleClear}
          onValueChange={handleSearchChange}
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
            selectedKeys={statusFilter}
            selectionMode="multiple"
            onSelectionChange={setStatusFilter}
          >
            {ALL_STATUS.map((status: string) => (
              <DropdownItem key={`${status}1`} className="capitalize">
                {status}
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
            selectedKeys={visibleColumns}
            selectionMode="multiple"
            onSelectionChange={setVisibleColumns}
          >
            {ALL_COLUMNS.map((column: any) => (
              <DropdownItem key={column} className="capitalize">
                {column}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Button color="primary" isDisabled={selectedMetadata === null} onClick={handleClick}>Add job</Button>
      </div>
      <div className="flex justify-between gap-4 text-small">
        <div>
          {allMetadata.length}
          {' '}
          total jobs
        </div>
        <div>
          Jobs per page
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={handleRowsPerPageChange}
            defaultValue={rowsPerPage}
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
