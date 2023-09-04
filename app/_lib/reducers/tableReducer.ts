import { Table } from '@/_types/components/tableTypes';

const tableReducer = (
  table: Table,
  action: any, // @develop
): any => {
  switch (action.type) {
    case 'UPDATE_SELECTED_KEY':
      return { ...table, selectedKey: action.key };
    case 'UPDATE_SORT_DESCRIPTOR':
      return { ...table, sortDescriptor: action.sortDescriptor };
    case 'UPDATE_FILTER_QUERY':
      return { ...table, filter: { ...table.filter, query: action.query } };
    case 'UPDATE_FILTER_STATUS':
      return { ...table, filter: { ...table.filter, status: action.status } };
    case 'UPDATE_PAGE_ROWS':
      return { ...table, page: { ...table.page, rows: action.rows } };
    case 'UPDATE_PAGE_CURRENT':
      return { ...table, page: { ...table.page, current: action.page } };
    default: return table;
  }
};

export default tableReducer;
