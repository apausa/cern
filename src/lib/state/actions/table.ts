import { SortDescriptor } from '@nextui-org/react';
import { Key } from 'react';

const tableActionCreators: any = {
  updateSelectedKey: (dispatch: any, key: Key) => {
    dispatch({ type: 'UPDATE_SELECTED_KEY', key });
  },
  updateSortDescriptor: (dispatch: any, sortDescriptor: SortDescriptor) => {
    dispatch({ type: 'UPDATE_SORT_DESCRIPTOR', sortDescriptor });
  },
  updateFilterQuery: (dispatch: any, query: string) => {
    dispatch({ type: 'UPDATE_FILTER_QUERY', query });
  },
  updateFilterStatus: (dispatch: any, status: Set<string[]>) => {
    dispatch({ type: 'UPDATE_FILTER_STATUS', status });
  },
  updatePageRows: (dispatch: any, rows: number) => {
    dispatch({ type: 'UPDATE_PAGE_ROWS', rows });
  },
  updatePageCurrent: (dispatch: any, page: number) => {
    dispatch({ type: 'UPDATE_PAGE_CURRENT', page });
  },
};

export default tableActionCreators;
