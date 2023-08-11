/* eslint-disable object-property-newline */

const buildReducer = (
  currentState: any,
  action: any,
): any => {
  let nextState: any = currentState;

  switch (action.type) {
    case 'UPDATE_CHECKBOX_INPUT': nextState = {
      ...currentState, args: currentState.args.map((arg: any): any => (
        (arg!.name === action.event.target.name)
          ? { ...arg!, isChecked: !arg!.isChecked } : arg
      )),
    }; break;
    case 'UPDATE_NUMBER_INPUT': nextState = {
      ...currentState, args: currentState.args.map((arg: any): any => (
        (arg!.name === action.event.target.name)
          ? { ...arg!, value: action.event.target.value } : arg
      )),
    }; break;
    case 'UPDATE_RADIO_INPUT': nextState = {
      ...currentState, args: currentState.args.map((arg: any): any => (
        (arg!.name === action.event.target.name)
          ? { ...arg!, value: action.event.target.value } : arg
      )),
    }; break;
    case 'UPDATE_TEXT_AREA': break;
    default: break;
  }

  return nextState;
};

export default buildReducer;
