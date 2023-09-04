import {
  Arg,
  Form, FormAction,
} from '@/_types/components/formTypes';

const formReducer = (
  currentState: Form,
  action: FormAction,
): any => {
  switch (action.type) {
    case 'CREATE_FORM':
      return { ...action.form };
    case 'UPDATE_FORM_VERSION':
      return { ...currentState, selectedDate: action.version };
    case 'UPDATE_FORM_TITLE':
      return { ...currentState, title: action.title };
    case 'UPDATE_FORM_ADVANCED':
      return { ...currentState, advanced: action.advanced };
    case 'UPDATE_FORM_BUILD_CMD':
      return {
        ...currentState,
        buildCmd: {
          ...currentState.buildCmd,
          args: currentState.buildCmd.args.map((arg: Arg): Arg => (
            { ...arg, selected: (action.values.includes(arg.name)) }
          )),
        },
      };
    case 'UPDATE_FORM_RUN_CMD':
      return {
        ...currentState,
        runCmd: {
          ...currentState.runCmd,
          args: currentState.runCmd.args.map((arg: Arg): Arg => (
            { ...arg, selected: (action.values.includes(arg.name)) }
          )),
        },
      };
    case 'UPDATE_FORM_SCRIPT':
      return { ...currentState, script: action.script };
    default:
      return currentState;
  }
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
