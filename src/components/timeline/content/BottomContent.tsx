import { Pagination } from '@nextui-org/react';
import React from 'react';
import tableActionCreators from '@/lib/state/actions/table';

export default function BottomContent({
  table,
  dispatchTable,
  filteredMetadata,
}: any) {
  const handleUpdatePageCurrent = (page: number) => {
    tableActionCreators.updatePageCurrent(dispatchTable, page);
  };

  return (
    <div className="flex pb-2 justify-between items-center">
      <Pagination
        isCompact
        showControls
        color="primary"
        page={table.page.current}
        total={Math.ceil(filteredMetadata.length / table.page.rows)}
        onChange={handleUpdatePageCurrent}
      />
    </div>
  );
}
