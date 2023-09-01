import { FormActionCreators } from '@/types/lib';

const formActionCreators: FormActionCreators = {
  createForm: (dispatch, form) => {
    dispatch({ type: 'CREATE_FORM', form });
  },
  updateFormTitle: (dispatch, title) => {
    dispatch({ type: 'UPDATE_FORM_TITLE', title });
  },
  updateFormSelectedDate: (dispatch, selectedDate) => {
    dispatch({ type: 'UPDATE_FORM_SELECTED_DATE', selectedDate });
  },
  updateFormAdvanced: (dispatch, mode) => {
    dispatch({ type: 'UPDATE_FORM_ADVANCED', mode });
  },
  updateFormCmdStr: (dispatch, cmdStr) => {
    dispatch({ type: 'UPDATE_FORM_CMD_STR', cmdStr });
  },
  updateFormCmdObjArg: (dispatch, values) => {
    dispatch({ type: 'UPDATE_FORM_CMD_OBJ_ARG', values });
  },
  updateFormCmdObjVal: (dispatch, value, name) => {
    dispatch({ type: 'UPDATE_FORM_CMD_OBJ_VAL', value, name });
  },
};

export default formActionCreators;
