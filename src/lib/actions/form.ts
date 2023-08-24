import { FormActionCreators } from '@/types/lib';

const formActionCreators: FormActionCreators = {
  createForm: (dispatch, form) => {
    dispatch({ type: 'CREATE_FORM', form });
  },
  updateFormSelectedDate: (dispatch, selectedDate) => {
    dispatch({ type: 'UPDATE_FORM_SELECTED_DATE', selectedDate });
  },
  updateFormTitle: (dispatch, title) => {
    dispatch({ type: 'UPDATE_FORM_TITLE', title });
  },
  updateFormAdvanced: (dispatch, mode) => {
    dispatch({ type: 'UPDATE_FORM_ADVANCED', mode });
  },
  updateFormCmdStr: (dispatch, cmdStr) => {
    dispatch({ type: 'UPDATE_FORM_CMD_STR', cmdStr });
  },
  updateFormCmdObjArg: (dispatch, keys) => {
    dispatch({ type: 'UPDATE_FORM_CMD_OBJ_ARG', keys });
  },
  updateFormCmdObjVal: (dispatch, key, name) => {
    dispatch({ type: 'UPDATE_FORM_CMD_OBJ_VAL', key, name });
  },
};

export default formActionCreators;
