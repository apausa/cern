import { TableActionCreators } from '@/(private)/_types/components/tableTypes';

const tableActionCreators: TableActionCreators = {
  updateSelectedKey: (dispatch, key) => {
    dispatch({ type: 'UPDATE_SELECTED_KEY', key });
  },
  updateSortDescriptor: (dispatch, sortDescriptor) => {
    dispatch({ type: 'UPDATE_SORT_DESCRIPTOR', sortDescriptor });
  },
  updateFilterQuery: (dispatch, query) => {
    dispatch({ type: 'UPDATE_FILTER_QUERY', query });
  },
  updateFilterStatus: (dispatch, status) => {
    dispatch({ type: 'UPDATE_FILTER_STATUS', status });
  },
  updatePageRows: (dispatch, rows) => {
    dispatch({ type: 'UPDATE_PAGE_ROWS', rows });
  },
  updatePageCurrent: (dispatch, page) => {
    dispatch({ type: 'UPDATE_PAGE_CURRENT', page });
  },
};

export default tableActionCreators;
