import { FormActionCreators } from '@/(private)/_types/components/formTypes';

const formActionCreators: FormActionCreators = {
  createForm: (dispatch, form) => {
    dispatch({ type: 'CREATE_FORM', form });
  },
  updateFormVersion: (dispatch, version) => {
    dispatch({ type: 'UPDATE_FORM_VERSION', version });
  },
  updateFormTitle: (dispatch, title) => {
    dispatch({ type: 'UPDATE_FORM_TITLE', title });
  },
  updateFormAdvanced: (dispatch, advanced) => { // @develop, not necessary
    dispatch({ type: 'UPDATE_FORM_ADVANCED', advanced });
  },
  updateFormBuildCmd: (dispatch, values) => {
    dispatch({ type: 'UPDATE_FORM_BUILD_CMD', values });
  },
  updateFormRunCmd: (dispatch, values) => {
    dispatch({ type: 'UPDATE_FORM_RUN_CMD', values });
  },
  updateFormScript: (dispatch, script) => {
    dispatch({ type: 'UPDATE_FORM_SCRIPT', script });
  },
};

export default formActionCreators;
