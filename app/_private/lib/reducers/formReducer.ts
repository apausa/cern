import {
  Arg,
  Form, FormAction,
} from '@/_private/types/components/formTypes';
import { setForm } from '@/_private/utils/localStorage';

const formReducer = (
  currentState: Form,
  action: FormAction,
): any => {
  let nextState = null;

  switch (action.type) {
    // Read form
    case 'READ_FORM':
      nextState = { ...action.form };
      break;

    // Create form
    case 'CREATE_FORM':
      nextState = { ...action.form };
      break;

    // Update form
    case 'UPDATE_FORM_VERSION':
      nextState = { ...currentState, version: action.version };
      break;
    case 'UPDATE_FORM_TITLE':
      nextState = { ...currentState, title: action.title };
      break;
    case 'UPDATE_FORM_ADVANCED':
      nextState = { ...currentState, advanced: action.advanced };
      break;
    case 'UPDATE_FORM_SCRIPT':
      nextState = { ...currentState, script: action.script };
      break;

    // Update form, createWorkflow properties
    case 'UPDATE_BUILD_CMD_SELECTED':
      nextState = {
        ...currentState,
        createWorkflow: {
          ...currentState.createWorkflow,
          args: currentState.createWorkflow.args.map((arg: Arg): Arg => (
            { ...arg, selected: (action.values.includes(arg.name)) }
          )),
        },
      };
      break;
    case 'UPDATE_BUILD_CMD_VALUE':
      nextState = {
        ...currentState,
        createWorkflow: {
          ...currentState.createWorkflow,
          args: currentState.createWorkflow.args.map((arg: any): Arg => (
            { ...arg, value: (action.name === arg.name) ? action.value : arg.value }
          )),
        },
      };
      break;

    // Update form, runWorkflow properties
    case 'UPDATE_RUN_CMD_SELECTED':
      nextState = {
        ...currentState,
        runWorkflow: {
          ...currentState.runWorkflow,
          args: currentState.runWorkflow.args.map((arg: Arg): Arg => (
            { ...arg, selected: (action.values.includes(arg.name)) }
          )),
        },
      };
      break;
    case 'UPDATE_RUN_CMD_VALUE':
      nextState = {
        ...currentState,
        runWorkflow: {
          ...currentState.runWorkflow,
          args: currentState.runWorkflow.args.map((arg: any): Arg => (
            { ...arg, value: (action.name === arg.name) ? action.value : arg.value }
          )),
        },
      };
      break;

    default:
      nextState = currentState;
      break;
  }

  setForm(nextState);

  return nextState;
};

export default formReducer;
