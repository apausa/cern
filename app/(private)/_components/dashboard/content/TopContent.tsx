import React, { useCallback } from 'react';

// State
import tableActionCreators from '@/(private)/_lib/actions/tableActions';

// Types
import { TopContentProps } from '@/(private)/_types/components/tableTypes';

export default function TopContent({
  table,
  dispatchTable,
  allPagesItems,
}: TopContentProps) {
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
