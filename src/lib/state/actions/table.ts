import { Key } from 'react';

const tableActionCreators: any = {
  updateSelectedColumns: (dispatch: any, keys: Set<string[]>) => {
    dispatch({ type: 'UPDATE_SELECTED_COLUMNS', keys });
  },
  updateSelectedKey: (dispatch: any, key: Key) => {
    dispatch({ type: 'UPDATE_SELECTED_KEY', key });
  },
  updateFilterQuery: (dispatch: any, query: string) => {
    dispatch({ type: 'UPDATE_FILTER_QUERY', query });
  },
  updateFilterStatus: (dispatch: any, keys: Set<string[]>) => {
    dispatch({ type: 'UPDATE_FILTER_STATUS', keys });
  },
  updatePageRows: (dispatch: any, rows: number) => {
    dispatch({ type: 'UPDATE_PAGE_ROWS', rows });
  },
  updatePageCurrent: (dispatch: any, page: number) => {
    dispatch({ type: 'UPDATE_PAGE_CURRENT', page });
  },
};

export default tableActionCreators;
