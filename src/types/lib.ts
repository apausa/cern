import { SortDescriptor } from '@nextui-org/react';
import { Dispatch } from 'react';

// Status

export type Status = 'PENDING' | 'FULFILLED' | 'REJECTED' | null;
export type StatusName = 'Running' | 'Completed' | 'Error' | 'Staged';
export type StatusColor = 'warning' | 'success' | 'danger' | 'default';

// Metadata

export type Metadata = {
  id: string,
  date: Date,
  form: Form,
  testScript: TestScript,
  gridScript: GridScript
};

export type TestScript = {
  scriptPath: string,
  scriptBody: string,
  scriptStatus: Status,
  rejectedOutput: string | null,
  fulfilledOutput: null,
};

export type GridScript = {
  scriptPath: string,
  scriptBody: string,
  scriptStatus: Status,
  rejectedOutput: string | null,
  fulfilledOutput: Outputs,
};

export type Outputs = {
  gridDirectory: string | null,
  localDirectory: string | null,
  gridUrl: string | null,
  gridId: string | null
};

// Metadata reducer

export type DashboardUseReducer = [Metadata[], Dispatch<MetadataAction>];

// Metadata actions

export type MetadataAction = ReadAllMetadataAction |
CreateMetadataAction |
UpdateMetadataAction |
DeleteMetadataAction;

export type ReadAllMetadataAction = { type: 'READ_ALL_METADATA', allMetadata: Metadata[] };
export type CreateMetadataAction = { type: 'CREATE_METADATA', metadata: Metadata };
export type UpdateMetadataAction = { type: 'UPDATE_METADATA', metadata: Metadata };
export type DeleteMetadataAction = { type: 'DELETE_METADATA', metadata: Metadata };

export type MetadataActionCreators = {
  readAllMetadata: (
    dispatch: React.Dispatch<ReadAllMetadataAction>
  ) => void,
  createMetadata: (
    dispatch: React.Dispatch<CreateMetadataAction>,
    form: Form) => Promise<void>,
  updateMetadataTestStatus: (
    dispatch: React.Dispatch<UpdateMetadataAction>,
    metadata: Metadata,
    status: Status) => void,
  updateMetadataGridStatus: (
    dispatch: React.Dispatch<UpdateMetadataAction>,
    metadata: Metadata,
    status: Status) => void,
  executeMetadataInTest: (
    dispatch: React.Dispatch<UpdateMetadataAction>,
    metadata: Metadata) => Promise<void>,
  executeMetadataInGrid: (
    dispatch: React.Dispatch<UpdateMetadataAction>,
    metadata: Metadata
  ) => Promise<void>,
};

// Form

export type Form = {
  title: string,
  selectedDate: string,
  cmdObj: CmdObj,
  cmdStr: string,
  advanced: boolean
};

export type CmdObj = {
  name: string,
  args: CmdArg[];
};

export type CmdArg = NumberArg | BooleanArg | NullArg | StringArg;

export type NumberArg = {
  name: string,
  input: { type: 'number' },
  description: string,
  value: number,
  selected: boolean,
  disabled: boolean,
};

export type BooleanArg = {
  name: string,
  input: { type: 'boolean' },
  description: string,
  value: null,
  selected: boolean,
  disabled: boolean,
};

export type NullArg = {
  name: string,
  input: { type: null },
  description: string,
  value: null,
  selected: boolean,
  disabled: boolean,
};

export type StringArg = {
  name: string,
  input: { type: 'string', options?: string[] },
  description: string,
  value: string,
  selected: boolean,
  disabled: boolean,
};

// Form reducer

export type FormUseReducer = [Form, React.Dispatch<FormAction>];

// Form actions

export type FormAction = CreateFormAction |
UpdateFormSelectedDateAction |
UpdateFormTitleAction |
UpdateFormAdvancedAction |
UpdateFormCmdStrAction |
UpdateFormCmdObjArgAction |
UpdateFormCmdObjValAction;

export type CreateFormAction = { type: 'CREATE_FORM', form: Form };
export type UpdateFormSelectedDateAction = { type: 'UPDATE_FORM_SELECTED_DATE', selectedDate: string };
export type UpdateFormTitleAction = { type: 'UPDATE_FORM_TITLE', title: string };
export type UpdateFormAdvancedAction = { type: 'UPDATE_FORM_ADVANCED', mode: boolean };
export type UpdateFormCmdStrAction = { type: 'UPDATE_FORM_CMD_STR', cmdStr: string };
export type UpdateFormCmdObjArgAction = { type: 'UPDATE_FORM_CMD_OBJ_ARG', values: string[] };
export type UpdateFormCmdObjValAction = { type: 'UPDATE_FORM_CMD_OBJ_VAL', value: string | boolean | number, name: string };

export type FormActionCreators = {
  createForm: (
    dispatch: React.Dispatch<CreateFormAction>,
    form: Form
  ) => void;
  updateFormSelectedDate: (
    dispatch: React.Dispatch<UpdateFormSelectedDateAction>,
    selectedDate: string
  ) => void;
  updateFormTitle: (
    dispatch: React.Dispatch<UpdateFormTitleAction>,
    title: string
  ) => void;
  updateFormAdvanced: (
    dispatch: React.Dispatch<UpdateFormAdvancedAction>,
    mode: boolean
  ) => void;
  updateFormCmdStr: (
    dispatch: React.Dispatch<UpdateFormCmdStrAction>,
    cmdStr: string
  ) => void;
  updateFormCmdObjArg: (
    dispatch: React.Dispatch<UpdateFormCmdObjArgAction>,
    values: string[]
  ) => void;
  updateFormCmdObjVal: (
    dispatch: React.Dispatch<UpdateFormCmdObjValAction>,
    value: string | boolean | number, name: string
  ) => void;
};

// Table

export type ColumnKey = 'Title' | 'Number' | 'Local status' | 'WLCG status' | 'Date' | 'Options';

export type Column = {
  key: ColumnKey,
  selected: boolean,
  allowSorting: boolean,
};

export type Table = {
  selectedColumns: Set<string> | 'all',
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

// Table reducer

export type TableUseReducer = [Table, Dispatch<any>];
