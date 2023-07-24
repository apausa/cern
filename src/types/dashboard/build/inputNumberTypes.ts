import { NumberArg } from './buildTypes';

export type PropsNumber = {
  arg: NumberArg,
  dispatch: any, // @develop
};

export type ActionNumber = {
  type: 'UPDATE_INPUT_NUMBER',
  event: any // @develop
};
