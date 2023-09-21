import { Selection, SortDescriptor } from '@nextui-org/react';
import { Dispatch } from 'react';

// CONSTANT

export type ColumnKey = 'Title' | 'Sub-jobs number' | 'Local status' | 'WLCG status' | 'Creation date' | 'Options';

export type Column = {
  key: ColumnKey,
  allowSorting: boolean,
};

export type TableType = {
  selectedColumns: Column[],
  selectedKey: string,
  filter: Filter,
  page: Page,
  sortDescriptor: SortDescriptor,
};

export type Filter = {
  status: Selection,
  query: string,
};

export type Page = {
  rows: number,
  current: number,
};

// REDUCER

export type TableUseReducer = [TableType, Dispatch<any>];

// ACTIONS

export type TableAction = UpdateSelectedKeyAction |
UpdateSortDescriptorAction |
UpdateFilterQueryAction |
UpdateFilterStatusAction |
UpdatePageRowsAction |
UpdatePageCurrentAction;

export type UpdateSelectedKeyAction = { type: 'UPDATE_SELECTED_KEY', key: string };
export type UpdateSortDescriptorAction = { type: 'UPDATE_SORT_DESCRIPTOR', sortDescriptor: SortDescriptor };
export type UpdateFilterQueryAction = { type: 'UPDATE_FILTER_QUERY', query: string };
export type UpdateFilterStatusAction = { type: 'UPDATE_FILTER_STATUS', status: Selection };
export type UpdatePageRowsAction = { type: 'UPDATE_PAGE_ROWS', rows: number };
export type UpdatePageCurrentAction = { type: 'UPDATE_PAGE_CURRENT', page: number };

export type UpdateSelectedKey = (
  dispatch: React.Dispatch<UpdateSelectedKeyAction>,
  key: string
) => void;
export type UpdateSortDescriptor = (
  dispatch: React.Dispatch<UpdateSortDescriptorAction>,
  sortDescriptor: SortDescriptor
) => void;
export type UpdateFilterQuery = (
  dispatch: React.Dispatch< UpdateFilterQueryAction>,
  query: string
) => void;
export type UpdateFilterStatus = (
  dispatch: React.Dispatch<UpdateFilterStatusAction>,
  status: Selection
) => void;
export type UpdatePageRows = (
  dispatch: React.Dispatch<UpdatePageRowsAction>,
  rows: number
) => void;
export type UpdatePageCurrent = (
  dispatch: React.Dispatch<UpdatePageCurrentAction>,
  page: number
) => void;

export type TableActionCreators = {
  updateSelectedKey: UpdateSelectedKey,
  updateSortDescriptor: UpdateSortDescriptor,
  updateFilterQuery: UpdateFilterQuery,
  updateFilterStatus: UpdateFilterStatus,
  updatePageRows: UpdatePageRows,
  updatePageCurrent: UpdatePageCurrent
};
