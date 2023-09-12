import React, { useCallback } from 'react';

// State
import tableActionCreators from '@/_private/lib/actions/tableActions';
import { Simulation } from '@/_private/types/components/simulationTypes';
import { TableAction, TableType } from '@/_private/types/components/tableTypes';

export default function TopContent(
  {
    table,
    dispatchTable,
    allPagesItems,
  }: {
    table: TableType,
    dispatchTable: React.Dispatch<TableAction>,
    allPagesItems: Simulation[]
  },
) {
  const onChange = useCallback(({ target: { value } }: any) => {
    tableActionCreators.updatePageRows(dispatchTable, Number(value));
    tableActionCreators.updatePageCurrent(dispatchTable, 1);
  }, []);

  return (
    <div className="flex justify-between text-small">
      <div>
        {allPagesItems.length}
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
