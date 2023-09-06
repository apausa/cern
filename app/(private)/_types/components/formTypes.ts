/* eslint-disable no-template-curly-in-string */

import { Dispatch } from 'react';

// CONSTANT

export type Form = {
  title: string,
  version: string,
  buildCmd: BuildCmd
  runCmd: RunCmd,
  script: string,
  advanced: boolean
};

// Build object

export type BuildCmd = {
  name: '${O2DPG_ROOT}/MC/bin/o2dpg_sim_workflow.py',
  args: Arg[];
};

// Run object

export type RunCmd = {
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

export type FormAction = CreateFormAction |
UpdateFormVersionAction |
UpdateFormTitleAction |
UpdateFormAdvancedAction |
UpdateFormBuildCmdAction |
UpdateFormRunCmdAction |
UpdateFormScriptAction;

export type CreateFormAction = { type: 'CREATE_FORM', form: Form };
export type UpdateFormVersionAction = { type: 'UPDATE_FORM_VERSION', version: string };
export type UpdateFormTitleAction = { type: 'UPDATE_FORM_TITLE', title: string };
export type UpdateFormAdvancedAction = { type: 'UPDATE_FORM_ADVANCED', advanced: boolean };
export type UpdateFormBuildCmdAction = { type: 'UPDATE_FORM_BUILD_CMD', values: string[] };
export type UpdateFormRunCmdAction = { type: 'UPDATE_FORM_RUN_CMD', values: string[] };
export type UpdateFormScriptAction = { type: 'UPDATE_FORM_SCRIPT', script: string };

export type FormActionCreators = {
  createForm: (
    dispatch: React.Dispatch<CreateFormAction>,
    form: Form
  ) => void;
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
  updateFormBuildCmd: (
    dispatch: React.Dispatch<UpdateFormBuildCmdAction>,
    values: string[]
  ) => void;
  updateFormRunCmd: (
    dispatch: React.Dispatch<UpdateFormRunCmdAction>,
    values: string[]
  ) => void;
  updateFormScript: (
    dispatch: React.Dispatch<UpdateFormScriptAction>,
    script: string
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
  buildCmd: BuildCmd,
  runCmd: RunCmd
  dispatchForm: Dispatch<FormAction>
};
export type AdvancedModeProps = {
  script: string,
  dispatchForm: Dispatch<FormAction>
};
export type SelectVersionProps = any;

export type NumberInputProps = {
  arg: NumberArg,
  dispatchForm: Dispatch<FormAction>
};

export type StringInputProps = {
  arg: StringArg,
  dispatchForm: Dispatch<FormAction>
};
