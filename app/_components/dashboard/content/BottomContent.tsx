import { Button, Pagination } from '@nextui-org/react';
import React, { useMemo } from 'react';

// State
import tableActionCreators from '@/_lib/actions/tableActions';

// Types
import { BottomContentProps } from '@/_types/components/tableTypes';

export default function BottomContent({
  table,
  dispatchTable,
  filteredSimulations,
}: BottomContentProps) {
  const pages: number = useMemo(() => (
    Math.ceil((filteredSimulations.length || 1) / table.page.rows)
  ), [filteredSimulations.length, table.page.rows]);

  const onNextPage = (): void => {
    if (table.page.current < pages) {
      tableActionCreators.updatePageCurrent(dispatchTable, table.page.current + 1);
    }
  };

  const onChange = (page: number): void => {
    tableActionCreators.updatePageCurrent(dispatchTable, page);
  };

  const onPreviousPage = (): void => {
    if (table.page.current > 1) {
      tableActionCreators.updatePageCurrent(dispatchTable, table.page.current - 1);
    }
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
        onChange={onChange}
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
