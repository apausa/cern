import { Button, Pagination } from '@nextui-org/react';
import React from 'react';

export default function BottomContent({ page, setPage, rowsPerPage }: any) {
  const pages = Math.ceil(32 / rowsPerPage);

  const onNextPage = () => {
    if (page < pages) {
      setPage(page + 1);
    }
  };

  const onPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <Button
        isDisabled={pages === 1}
        onPress={onPreviousPage}
      >
        Previous
      </Button>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
      />
      <Button
        isDisabled={pages === 1}
        onPress={onNextPage}
      >
        Next
      </Button>
    </div>
  );
}
