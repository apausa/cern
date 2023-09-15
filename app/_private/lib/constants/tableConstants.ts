import { TableType } from '@/_private/types/lib/tableTypes';

export const INITIAL_TABLE: TableType = {
  selectedKey: '',
  filter: { query: '', status: 'all' },
  page: { rows: 12, current: 1 },
  sortDescriptor: { column: 'Date', direction: 'descending' },
  selectedColumns: [
    {
      key: 'Title',
      allowSorting: false,
    },
    {
      key: 'Number',
      allowSorting: false,
    },
    {
      key: 'Local status',
      allowSorting: false,
    },
    {
      key: 'WLCG status',
      allowSorting: false,
    },
    {
      key: 'Date',
      allowSorting: true,
    },
  ],
};
