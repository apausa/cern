import { Column, Table } from '@/types/lib';

export const ALL_COLUMNS: Column[] = [ // @develop, type harder
  {
    title: 'Title',
    key: 'title',
    selected: true,
    allowSorting: false,
  },
  {
    title: 'Number',
    key: 'number',
    selected: true,
    allowSorting: false,
  },
  {
    title: 'Local status',
    key: 'local status',
    selected: true,
    allowSorting: false,
  },
  {
    title: 'WLCG status',
    key: 'wlcg status',
    selected: true,
    allowSorting: false,
  },
  {
    title: 'Date',
    key: 'date',
    selected: true,
    allowSorting: false,
  },
  {
    title: 'Options',
    key: 'options',
    selected: false,
    allowSorting: false,
  },
];

export const INITIAL_TABLE: Table = {
  selectedKey: new Set(['']),
  filter: { query: '', status: 'all' },
  page: { rows: 16, current: 1 },
  selectedColumns: new Set(ALL_COLUMNS
    .filter(({ selected }: Column) => selected)
    .map(({ key }: Column) => key)),
};
