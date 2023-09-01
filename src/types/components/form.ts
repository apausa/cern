import { Dispatch } from 'react';
import {
  BooleanArg, FormAction, NumberArg, StringArg,
} from '../lib';

export type BuildProps = any;

export type SidebarProps = any;

export type FormProps = any;

export type DefaultModeProps = any;

export type AdvancedModeProps = any;

export type SelectVersionProps = any;

export type NumberInputProps = {
  arg: NumberArg,
  dispatchForm: Dispatch<FormAction>
};

export type StringInputProps = {
  arg: StringArg,
  dispatchForm: Dispatch<FormAction>
};
