import { Button, Pagination } from '@nextui-org/react';
import React from 'react';
import tableActionCreators from '@/lib/state/actions/table';

export default function BottomContent({
  table,
  dispatchTable,
  filteredMetadata,
}: any) {
  const onNextPage = () => {
    if (table.page.current < Math.ceil(filteredMetadata.length / table.page.rows)) {
      tableActionCreators.updatePageCurrent(dispatchTable, table.page.current + 1);
    }
  };

  const onPreviousPage = () => {
    if (table.page.current > 1) {
      tableActionCreators.updatePageCurrent(dispatchTable, table.page.current - 1);
    }
  };

  const handleUpdatePageCurrent = (page: number) => {
    tableActionCreators.updatePageCurrent(dispatchTable, page);
  };

  return (
    <div className="flex pb-2 justify-between items-center">
      <Button
        isDisabled={table.page.current === 1}
        onPress={onPreviousPage}
      >
        ←
      </Button>
      <Pagination
        isCompact
        showShadow
        color="primary"
        page={table.page.current}
        total={Math.ceil(filteredMetadata.length / table.page.rows)}
        onChange={handleUpdatePageCurrent}
      />
      <Button
        isDisabled={table.page.current === Math.ceil(filteredMetadata.length / table.page.rows)}
        onPress={onNextPage}
      >
        →
      </Button>
    </div>
  );
}
