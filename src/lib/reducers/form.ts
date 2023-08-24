import INITIAL_FORM from '../constants/form';

const formReducer = (
  currentState: any,
  action: any,
): any => {
  switch (action.type) {
    case 'SET_SELECTED_DATE': return { ...currentState, selectedDate: action.selectedDate };
    case 'SET_CMD_STR': return { ...currentState, cmdStr: action.cmdStr };
    case 'SET_CMD_OBJ_ARGUMENT': { return {
      ...currentState,
      cmdObj: {
        ...currentState.cmdObj,
        args: currentState.cmdObj.args.map((arg: any): any => (
          { ...arg!, selected: (action.keys === 'all' ? true : action.keys.has(arg.name)) })),
      },
    };
    }
    case 'SET_CMD_OBJ_VALUE': return {
      ...currentState,
      cmdObj: {
        ...currentState.cmdObj,
        args: currentState.cmdObj.args.map((arg: any): any => (
          (action.name === arg.name) ? { ...arg, value: Array.from(action.key)[0] } : arg
        )),
      },

    };
    case 'SET_ADVANCED': return { ...currentState, advanced: action.mode };
    case 'SET_TITLE': return { ...currentState, title: action.title };
    case 'RESET_FORM': return INITIAL_FORM;
    case 'SET_FORM': return action.metadata.form;
    default: return currentState;
  }
};

export default formReducer;
