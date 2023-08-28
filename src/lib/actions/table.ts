import { Key } from 'react';

const tableActionCreators: any = {
  updateSelectedKey: (dispatch: any, key: Key) => {
    dispatch({ type: 'UPDATE_SELECTED_KEY', key });
  },
  updateSelectedColumns: (dispatch: any, keys: any) => {
    dispatch({ type: 'UPDATE_SELECTED_COLUMNS', keys });
  },

  // @develop
  updateFilterValue: (dispatch: any, value: any) => {
    dispatch({ type: 'UPDATE_FILTER_VALUE', value });
  },
  updateStatusFilter: (dispatch: any, value: any) => {
    dispatch({ type: 'UPDATE_STATUS_FILTER', value });
  },
  updateRowsPerPage: (dispatch: any, value: any) => {
    dispatch({ type: 'UPDATE_ROWS_PER_PAGE', value });
  },
  updateSortDescriptor: (dispatch: any, value: any) => {
    dispatch({ type: 'UPDATE_SORT_DESCRIPTOR', value });
  },
  updatePage: (dispatch: any, value: any) => {
    dispatch({ type: 'UPDATE_PAGE', value });
  },
};

export default tableActionCreators;
