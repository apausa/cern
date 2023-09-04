import { Button, Pagination } from '@nextui-org/react';
import React from 'react';

// State
import tableActionCreators from '@/_lib/actions/tableActions';

// Types
import { BottomContentProps } from '@/_types/components/tableTypes';

export default function BottomContent({
  table,
  dispatchTable,
  filteredSimulation,
}: BottomContentProps) {
  const pages: number = Math.ceil(filteredSimulation.length / table.page.rows);

  const onNextPage = (): void => {
    if (table.page.current < pages) {
      tableActionCreators.updatePageCurrent(dispatchTable, table.page.current + 1);
    }
  };

  const onPreviousPage = (): void => {
    if (table.page.current > 1) {
      tableActionCreators.updatePageCurrent(dispatchTable, table.page.current - 1);
    }
  };

  const handleUpdatePageCurrent = (page: number): void => {
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
        total={pages}
        onChange={handleUpdatePageCurrent}
      />
      <Button
        isDisabled={table.page.current === pages}
        onPress={onNextPage}
      >
        →
      </Button>
    </div>
  );
}
