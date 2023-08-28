import { Table } from '@/types/lib';

export const ALL_COLUMNS = ['title', 'number', 'local status', 'wlcg status', 'date', 'options'];

export const ALL_STATUS = ['Running', 'Completed', 'Error', 'Staged'];

export const INITIAL_TABLE: Table = {
  filterValue: '',
  selectedColumns: new Set([ALL_COLUMNS]),
  selectedKey: new Set(['']),
  statusFilter: 'all',
  rowsPerPage: 8,
  sortDescriptor: {
    column: 'date',
    direction: 'descending',
  },
  page: 1,

};
