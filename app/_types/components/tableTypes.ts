import { SortDescriptor } from '@nextui-org/react';
import { Dispatch } from 'react';
import { StatusName } from '../utils';

// CONSTANT

export type ColumnKey = 'Title' | 'Number' | 'Local status' | 'WLCG status' | 'Date' | 'Options';

export type Column = {
  key: ColumnKey,
  selected: boolean,
  allowSorting: boolean,
};

export type Table = {
  selectedColumns: Column[],
  selectedKey: Set<string>,
  filter: Filter,
  page: Page,
  sortDescriptor: SortDescriptor,
};

export type Filter = {
  status: Set<StatusName> | 'all',
  query: string,
};

export type Page = {
  rows: number,
  current: number,
};

// REDUCER

export type TableUseReducer = [Table, Dispatch<any>];

// @develop ACTIONS

// COMPONENTS

export type TimelineProps = any;
export type CellProps = any;
export type BottomContentProps = any;
export type TopContentProps = any;
