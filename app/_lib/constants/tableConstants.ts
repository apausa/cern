import { Column, Table } from '@/_types/components/tableTypes';

export const ALL_COLUMNS: Column[] = [
  {
    key: 'Title',
    selected: true,
    allowSorting: false,
  },
  {
    key: 'Number',
    selected: true,
    allowSorting: false,
  },
  {
    key: 'Local status',
    selected: true,
    allowSorting: false,
  },
  {
    key: 'WLCG status',
    selected: true,
    allowSorting: false,
  },
  {
    key: 'Date',
    selected: true,
    allowSorting: true,
  },
];

export const INITIAL_TABLE: Table = {
  selectedKey: new Set(['']),
  filter: { query: '', status: 'all' },
  page: { rows: 12, current: 1 },
  sortDescriptor: { column: 'date', direction: 'descending' },
  selectedColumns: ALL_COLUMNS.filter(({ selected }: Column) => selected),
};
