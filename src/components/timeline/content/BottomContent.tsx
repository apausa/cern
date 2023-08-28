import { Button, Pagination } from '@nextui-org/react';
import React from 'react';
import tableActionCreators from '@/lib/state/actions/table';

export default function BottomContent({
  table,
  dispatchTable,
  filteredMetadata,
}: any) {
  const onNextPage = () => {
    if (table.page < Math.ceil(filteredMetadata.length / table.page.rows)) {
      tableActionCreators.updatePageCurrent(dispatchTable, table.page + 1);
    }
  };

  const onPreviousPage = () => {
    if (table.page > 1) {
      tableActionCreators.updatePageCurrent(dispatchTable, table.page - 1);
    }
  };

  const handleUpdatePageCurrent = (page: number) => {
    tableActionCreators.updatePageCurrent(dispatchTable, page);
  };

  return (
    <div className="flex py-4 justify-between items-center">
      <Button
        isDisabled={Math.ceil(filteredMetadata.length / table.page.rows) === 1}
        onPress={onPreviousPage}
      >
        Previous
      </Button>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={table.page.current}
        total={Math.ceil(filteredMetadata.length / table.page.rows)}
        onChange={handleUpdatePageCurrent}
      />
      <Button
        isDisabled={Math.ceil(
          filteredMetadata.length / table.page.rows,
        ) === (filteredMetadata.length - 1)}
        onPress={onNextPage}
      >
        Next
      </Button>
    </div>
  );
}
