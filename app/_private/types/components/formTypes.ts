/* eslint-disable no-template-curly-in-string */

import { Dispatch } from 'react';

// CONSTANT

export type Form = {
  title: string,
  version: string,
  script: string | null,
  advanced: boolean
  createWorkflow: CreateWorkflow
  runWorkflow: RunWorkflow,
};

// Build object

export type CreateWorkflow = {
  name: '${O2DPG_ROOT}/MC/bin/o2dpg_sim_workflow.py',
  args: Arg[];
};

// Run object

export type RunWorkflow = {
  name: '${O2DPG_ROOT}/MC/bin/o2_dpg_workflow_runner.py',
  args: Arg[];
};

// Arguments

export type Arg = NumberArg | BooleanArg | StringArg;

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

export type StringArg = {
  name: string,
  input: { type: 'string', options: string[] },
  description: string,
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

// Read form
export type ReadFormAction = { type: 'READ_FORM', form: Form };
// Create form
export type CreateFormAction = { type: 'CREATE_FORM', form: Form };
// Update form
export type UpdateFormVersionAction = { type: 'UPDATE_FORM_VERSION', version: string };
export type UpdateFormTitleAction = { type: 'UPDATE_FORM_TITLE', title: string };
export type UpdateFormAdvancedAction = { type: 'UPDATE_FORM_ADVANCED', advanced: boolean };
export type UpdateFormScriptAction = { type: 'UPDATE_FORM_SCRIPT', script: string };
// Update form, createWorkflow properties
export type UpdateBuildCmdSelectedAction = { type: 'UPDATE_BUILD_CMD_SELECTED', values: string[] };
export type UpdateBuildCmdValueAction = { type: 'UPDATE_BUILD_CMD_VALUE', value: string | number, name: string };
// Update form, runWorkflow properties
export type UpdateRunCmdSelectedAction = { type: 'UPDATE_RUN_CMD_SELECTED', values: string[] };
export type UpdateRunCmdValueAction = { type: 'UPDATE_RUN_CMD_VALUE', value: string | number, name: string };

export type FormActionCreators = {
  // Read form
  readForm: (
    dispatch: React.Dispatch<ReadFormAction>,
  ) => void;
  // Create form
  createForm: (
    dispatch: React.Dispatch<CreateFormAction>,
    form: Form
  ) => void;
  // Update form
  updateFormVersion: (
    dispatch: React.Dispatch<UpdateFormVersionAction>,
    version: string
  ) => void;
  updateFormTitle: (
    dispatch: React.Dispatch<UpdateFormTitleAction>,
    title: string
  ) => void;
  updateFormAdvanced: (
    dispatch: React.Dispatch<UpdateFormAdvancedAction>,
    advanced: boolean
  ) => void;
  updateFormScript: (
    dispatch: React.Dispatch<UpdateFormScriptAction>,
    script: string
  ) => void;
  // Update form, createWorkflow properties
  updateBuildCmdSelected: (
    dispatch: React.Dispatch<UpdateBuildCmdSelectedAction>,
    values: string[]
  ) => void;
  updateBuildCmdValue: (
    dispatch: React.Dispatch<UpdateBuildCmdValueAction>,
    value: string | number,
    name: string,
  ) => void;
  // Update form, runWorkflow properties
  updateRunCmdSelected: (
    dispatch: React.Dispatch<UpdateRunCmdSelectedAction>,
    values: string[]
  ) => void;
  updateRunCmdValue: (
    dispatch: React.Dispatch<UpdateRunCmdValueAction>,
    value: string | number,
    name: string,
  ) => void;
};

// Components

export type BuildProps = any;
export type SidebarProps = any;
export type FormProps = {
  form: Form,
  dispatchForm: Dispatch<FormAction>
};
export type DefaultModeProps = {
  form: Form
  dispatchForm: Dispatch<FormAction>
};
export type AdvancedModeProps = {
  script: string,
  dispatchForm: Dispatch<FormAction>
};
export type SelectVersionProps = any;

export type NumberInputProps = {
  arg: NumberArg,
  formAction: (
    dispatch: React.Dispatch<UpdateBuildCmdValueAction | UpdateRunCmdValueAction>,
    value: string | number,
    name: string,
  ) => void
  dispatchForm: Dispatch<FormAction>
};

export type StringInputProps = {
  arg: StringArg,
  formAction: (
    dispatch: React.Dispatch<UpdateBuildCmdValueAction | UpdateRunCmdValueAction>,
    value: string | number,
    name: string,
  ) => void
  dispatchForm: Dispatch<FormAction>
};
