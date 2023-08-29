import { Selection, SortDescriptor } from '@nextui-org/react';
import { Dispatch } from 'react';

// Status

export type Status = 'PENDING' | 'FULFILLED' | 'REJECTED' | null;
export type StatusName = 'running' | 'completed' | 'error' | 'staged';
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
};

export type GridScript = {
  scriptPath: string,
  scriptBody: string,
  scriptStatus: Status,
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
  readAllMetadata: (dispatch: React.Dispatch<ReadAllMetadataAction>) => void,
  createMetadata: (dispatch: React.Dispatch<CreateMetadataAction>, form: Form) => Promise<void>,
  updateMetadataInTest: (
    dispatch: React.Dispatch<UpdateMetadataAction>, metadata: Metadata) => Promise<void>,
  updateMetadataInGrid: (
    dispatch: React.Dispatch<UpdateMetadataAction>, metadata: Metadata) => Promise<void>,
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
  name: 'o2-sim',
  args: [
    CmdPythiaArg,
    CmdNumberArg,
    CmdTGeantArg,
    CmdConfigArg,
  ];
};

export type CmdArg = CmdPythiaArg | CmdNumberArg | CmdTGeantArg | CmdConfigArg;

export type CmdNumberArg = {
  name: '-n',
  value: number,
  selected: boolean,
  disabled: boolean,
  input: { type: 'number', min: number, max: number },
};

export type CmdTGeantArg = {
  name: '-e',
  value: 'TGeant3' | 'TGeant4',
  selected: boolean,
  disabled: boolean,
  input: { type: 'select', options: ['TGeant3', 'TGeant4'] },
};

export type CmdPythiaArg = {
  name: '-g',
  value: 'pythia8pp',
  selected: boolean,
  disabled: boolean,
  input: { type: null },
};

export type CmdConfigArg = {
  name: '--configKeyValues',
  value: 'align-geom.mDetectors=none',
  selected: boolean,
  disabled: boolean,
  input: { type: null },

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
export type UpdateFormCmdObjArgAction = { type: 'UPDATE_FORM_CMD_OBJ_ARG', keys: Selection };
export type UpdateFormCmdObjValAction = { type: 'UPDATE_FORM_CMD_OBJ_VAL', key: string, name: string };

export type FormActionCreators = {
  createForm: (dispatch: React.Dispatch<CreateFormAction>, form: Form) => void;
  updateFormSelectedDate: (
    dispatch: React.Dispatch<UpdateFormSelectedDateAction>, selectedDate: string) => void;
  updateFormTitle: (dispatch: React.Dispatch<UpdateFormTitleAction>, title: string) => void;
  updateFormAdvanced: (dispatch: React.Dispatch<UpdateFormAdvancedAction>, mode: boolean) => void;
  updateFormCmdStr: (dispatch: React.Dispatch<UpdateFormCmdStrAction>, cmdStr: string) => void;
  updateFormCmdObjArg: (
    dispatch: React.Dispatch<UpdateFormCmdObjArgAction>, keys: Selection) => void;
  updateFormCmdObjVal: (
    dispatch: React.Dispatch<UpdateFormCmdObjValAction>, key: string, name: string) => void;
};

// Table

export type Column = {
  title: string,
  key: string,
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
