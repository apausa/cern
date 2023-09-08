import { Selection, SortDescriptor } from '@nextui-org/react';
import { Dispatch } from 'react';

// CONSTANT

export type ColumnKey = 'Title' | 'Number' | 'Local status' | 'WLCG status' | 'Date' | 'Options';

export type Column = {
  key: ColumnKey,
  selected: boolean,
  allowSorting: boolean,
};

export type Table = {
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

export type TableUseReducer = [Table, Dispatch<any>];

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

export type TableActionCreators = {
  updateSelectedKey: (
    dispatch: React.Dispatch<UpdateSelectedKeyAction>,
    key: string
  ) => void,
  updateSortDescriptor: (
    dispatch: React.Dispatch<UpdateSortDescriptorAction>,
    sortDescriptor: SortDescriptor
  ) => void,
  updateFilterQuery: (
    dispatch: React.Dispatch< UpdateFilterQueryAction>,
    query: string
  ) => void,
  updateFilterStatus: (
    dispatch: React.Dispatch<UpdateFilterStatusAction>,
    status: Selection
  ) => void,
  updatePageRows: (
    dispatch: React.Dispatch<UpdatePageRowsAction>,
    rows: number
  ) => void,
  updatePageCurrent: (
    dispatch: React.Dispatch<UpdatePageCurrentAction>,
    page: number
  ) => void,
};

// COMPONENTS

export type TimelineProps = any;
export type CellProps = any;
export type BottomContentProps = any;
export type TopContentProps = any;
