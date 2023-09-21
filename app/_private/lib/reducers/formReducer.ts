import {
  Arg,
  Form, FormAction,
} from '@/_private/types/lib/formTypes';

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

      // Update form, createWorkflow property
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

      // Update form, runWorkflow property
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

      // Update form, other propperty
    case 'UPDATE_FORM_VERSION':
      nextState = { ...currentState, version: action.version };
      break;
    case 'UPDATE_FORM_TITLE':
      nextState = { ...currentState, title: action.title };
      break;
    case 'UPDATE_FORM_SUBJOBS':
      nextState = { ...currentState, subjobs: action.subjobs };
      break;
    case 'UPDATE_FORM_ADVANCED':
      nextState = { ...currentState, advanced: action.advanced };
      break;
    case 'UPDATE_FORM_SCRIPT':
      nextState = { ...currentState, script: action.script };
      break;

    default:
      nextState = currentState;
      break;
  }

  localStorage.setItem('form', JSON.stringify(nextState));

  return nextState;
};

export default formReducer;
