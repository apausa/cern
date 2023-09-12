/* eslint-disable no-template-curly-in-string */

// CONSTANT

export type Form = {
  title: string,
  version: string,
  script: string,
  advanced: boolean
  createWorkflow: CreateWorkflow
  runWorkflow: RunWorkflow,
};

export type CreateWorkflow = {
  name: '${O2DPG_ROOT}/MC/bin/o2dpg_sim_workflow.py',
  args: Arg[];
};

export type RunWorkflow = {
  name: '${O2DPG_ROOT}/MC/bin/o2_dpg_workflow_runner.py',
  args: Arg[];
};

export type Arg = NumberArg | BooleanArg | StringArg;

export type NumberArg = {
  name: string,
  input: { type: 'number' },
  description: string | null,
  value: number,
  selected: boolean,
  disabled: boolean,
};

export type BooleanArg = {
  name: string,
  input: { type: 'boolean' },
  description: string | null,
  value: null,
  selected: boolean,
  disabled: boolean,
};

export type StringArg = {
  name: string,
  input: { type: 'string', options: string[] },
  description: string | null,
  value: string,
  selected: boolean,
  disabled: boolean,
};

// REDUCER

export type FormUseReducer = [Form, React.Dispatch<FormAction>];

// ACTIONS

export type FormAction = ReadFormAction |
CreateFormAction |
UpdateFormVersionAction |
UpdateFormTitleAction |
UpdateFormAdvancedAction |
UpdateFormScriptAction |
UpdateBuildCmdSelectedAction |
UpdateBuildCmdValueAction |
UpdateRunCmdSelectedAction |
UpdateRunCmdValueAction;

export type ReadFormAction = { type: 'READ_FORM', form: Form };
export type CreateFormAction = { type: 'CREATE_FORM', form: Form };
export type UpdateFormVersionAction = { type: 'UPDATE_FORM_VERSION', version: string };
export type UpdateFormTitleAction = { type: 'UPDATE_FORM_TITLE', title: string };
export type UpdateFormAdvancedAction = { type: 'UPDATE_FORM_ADVANCED', advanced: boolean };
export type UpdateFormScriptAction = { type: 'UPDATE_FORM_SCRIPT', script: string };
export type UpdateBuildCmdSelectedAction = { type: 'UPDATE_BUILD_CMD_SELECTED', values: string[] };
export type UpdateBuildCmdValueAction = { type: 'UPDATE_BUILD_CMD_VALUE', value: string | number, name: string };
export type UpdateRunCmdSelectedAction = { type: 'UPDATE_RUN_CMD_SELECTED', values: string[] };
export type UpdateRunCmdValueAction = { type: 'UPDATE_RUN_CMD_VALUE', value: string | number, name: string };

export type ReadForm = (
  dispatch: React.Dispatch<ReadFormAction>
) => void;
export type CreateForm = (
  dispatch: React.Dispatch<CreateFormAction>, form: Form
) => void;
export type UpdateFormVersion = (
  dispatch: React.Dispatch<UpdateFormVersionAction>, version: string
) => void;
export type UpdateFormTitle = (
  dispatch: React.Dispatch<UpdateFormTitleAction>, title: string
) => void;
export type UpdateFormAdvanced = (
  dispatch: React.Dispatch<UpdateFormAdvancedAction>, advanced: boolean
) => void;
export type UpdateFormScript = (
  dispatch: React.Dispatch<UpdateFormScriptAction>, script: string
) => void;
export type UpdateBuildCmdSelected = (
  dispatch: React.Dispatch<UpdateBuildCmdSelectedAction>, values: string[]
) => void;
export type UpdateBuildCmdValue = (
  dispatch: React.Dispatch<UpdateBuildCmdValueAction>, value: string | number, name: string
) => void;
export type UpdateRunCmdSelected = (
  dispatch: React.Dispatch<UpdateRunCmdSelectedAction>, values: string[]
) => void;
export type UpdateRunCmdValue = (
  dispatch: React.Dispatch<UpdateRunCmdValueAction>, value: string | number, name: string
) => void;

export type FormActionCreators = {
  readForm: ReadForm,
  createForm: CreateForm,
  updateFormVersion: UpdateFormVersion,
  updateFormTitle: UpdateFormTitle,
  updateFormAdvanced: UpdateFormAdvanced,
  updateFormScript: UpdateFormScript,
  updateBuildCmdSelected: UpdateBuildCmdSelected,
  updateBuildCmdValue: UpdateBuildCmdValue,
  updateRunCmdSelected: UpdateRunCmdSelected,
  updateRunCmdValue: UpdateRunCmdValue
};
