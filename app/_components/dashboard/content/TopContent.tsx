import React from 'react';

// State
import tableActionCreators from '@/_lib/actions/tableActions';

// Types
import { TopContentProps } from '@/_types/components/tableTypes';

export default function TopContent({
  table,
  dispatchTable,
  filteredSimulations,
}: TopContentProps) {
  const onChange = (event: any) => {
    tableActionCreators.updatePageRows(dispatchTable, Number(event.target.value));
    tableActionCreators.updatePageCurrent(dispatchTable, 1);
  };

  return (
    <div className="flex justify-between text-small">
      <div>
        {filteredSimulations.length}
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
  );
}
