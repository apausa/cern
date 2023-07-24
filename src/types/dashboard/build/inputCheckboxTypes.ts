import {
  ConfigArg, NumberArg, PythiaArg, TGeantArg,
} from './buildTypes';

export type PropsCheckbox = {
  arg: NumberArg | TGeantArg | PythiaArg | ConfigArg,
  dispatch: any, // @develop
};

export type ActionCheckbox = {
  type: 'UPDATE_INPUT_CHECKBOX',
  event: any // @develop
};
