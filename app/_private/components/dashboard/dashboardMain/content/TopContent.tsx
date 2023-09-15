import React, { useCallback } from 'react';

// State
import tableActionCreators from '@/_private/lib/actions/tableActions';
import { Simulation } from '@/_private/types/lib/simulationTypes';

// Types
import { TableAction, TableType } from '@/_private/types/lib/tableTypes';

export default function TopContent(
  {
    table,
    dispatchTable,
    allItems,
  }: {
    table: TableType,
    dispatchTable: React.Dispatch<TableAction>,
    allItems: Simulation[]
  },
) {
  const onChange = useCallback(({ target: { value } }: any) => {
    tableActionCreators.updatePageRows(dispatchTable, Number(value));
    tableActionCreators.updatePageCurrent(dispatchTable, 1);
  }, []);

  return (
    <div className="flex justify-between text-small">
      <div>
        {allItems.length}
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
          <option label="4" value="4">4</option>
          <option label="8" value="8">8</option>
          <option label="12" value="12">12</option>
        </select>
      </div>
    </div>
  );
}
