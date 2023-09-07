import {
  Arg,
  Form, FormAction,
} from '@/(private)/_types/components/formTypes';
import { setForm } from '@/(private)/_utils/localStorage';

const formReducer = (
  currentState: Form,
  action: FormAction,
): any => {
  let nextState = null;

  switch (action.type) {
    case 'READ_FORM':
      nextState = { ...action.form };
      break;
    case 'CREATE_FORM':
      nextState = { ...action.form };
      break;
    case 'UPDATE_FORM_VERSION':
      nextState = { ...currentState, version: action.version };
      break;
    case 'UPDATE_FORM_TITLE':
      nextState = { ...currentState, title: action.title };
      break;
    case 'UPDATE_FORM_ADVANCED':
      nextState = { ...currentState, advanced: action.advanced };
      break;
    case 'UPDATE_FORM_BUILD_CMD':
      nextState = {
        ...currentState,
        buildCmd: {
          ...currentState.buildCmd,
          args: currentState.buildCmd.args.map((arg: Arg): Arg => (
            { ...arg, selected: (action.values.includes(arg.name)) }
          )),
        },
      };
      break;
    case 'UPDATE_FORM_RUN_CMD':
      nextState = {
        ...currentState,
        runCmd: {
          ...currentState.runCmd,
          args: currentState.runCmd.args.map((arg: Arg): Arg => (
            { ...arg, selected: (action.values.includes(arg.name)) }
          )),
        },
      };
      break;
    case 'UPDATE_FORM_SCRIPT':
      nextState = { ...currentState, script: action.script };
      break;
    default:
      nextState = currentState;
      break;
  }

  setForm(nextState);

  return nextState;
};

export default formReducer;

// return {
//   ...currentState,
//   cmdObjBuild: {
//     ...currentState.cmdObjBuild,
//     args: currentState.cmdObjBuild.args.map((arg: CmdArg): any => (
//       (action.name === arg.name) ? { ...arg, value: action.value } : arg
//     )),
//   },
// };
