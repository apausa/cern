import { CmdArg, Form, FormAction } from '@/types/lib';

const formReducer = (
  currentState: Form,
  action: FormAction,
): any => {
  switch (action.type) {
    case 'CREATE_FORM':
      return { ...action.form };
    case 'UPDATE_FORM_SELECTED_DATE':
      return { ...currentState, selectedDate: action.selectedDate };
    case 'UPDATE_FORM_TITLE':
      return { ...currentState, title: action.title };
    case 'UPDATE_FORM_ADVANCED':
      return { ...currentState, advanced: action.mode };
    case 'UPDATE_FORM_CMD_STR':
      return { ...currentState, cmdStr: action.cmdStr };
    case 'UPDATE_FORM_CMD_OBJ_ARG': {
      return {
        ...currentState,
        cmdObj: {
          ...currentState.cmdObj,
          args: currentState.cmdObj.args.map((arg: CmdArg): any => (
            { ...arg!, selected: (action.values.includes(arg.name)) })),
        },
      };
    }
    case 'UPDATE_FORM_CMD_OBJ_VAL':
      return {
        ...currentState,
        cmdObj: {
          ...currentState.cmdObj,
          args: currentState.cmdObj.args.map((arg: CmdArg): any => (
            (action.name === arg.name) ? { ...arg, value: action.value } : arg
          )),
        },

      };
    default:
      return currentState;
  }
};

export default formReducer;
