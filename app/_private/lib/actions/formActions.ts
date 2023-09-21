import { Form, FormActionCreators } from '@/_private/types/lib/formTypes';
import { getForm } from '@/_private/utils/localStorage';

const formActionCreators: FormActionCreators = {
  // Read form
  readForm: (dispatch) => {
    const form: Form = getForm();

    dispatch({ type: 'READ_FORM', form });
  },

  // Create form
  createForm: (dispatch, form) => {
    dispatch({ type: 'CREATE_FORM', form });
  },

  // Update form
  updateFormVersion: (dispatch, version) => {
    dispatch({ type: 'UPDATE_FORM_VERSION', version });
  },
  updateFormTitle: (dispatch, title) => {
    dispatch({ type: 'UPDATE_FORM_TITLE', title });
  },
  updateFormSubjobs: (dispatch, subjobs) => {
    dispatch({ type: 'UPDATE_FORM_SUBJOBS', subjobs });
  },
  updateFormAdvanced: (dispatch, advanced) => {
    dispatch({ type: 'UPDATE_FORM_ADVANCED', advanced });
  },
  updateFormScript: (dispatch, script) => {
    dispatch({ type: 'UPDATE_FORM_SCRIPT', script });
  },

  // Update form, createWorkflow properties
  updateBuildCmdSelected: (dispatch, values) => {
    dispatch({ type: 'UPDATE_BUILD_CMD_SELECTED', values });
  },
  updateBuildCmdValue: (dispatch, value, name) => {
    dispatch({ type: 'UPDATE_BUILD_CMD_VALUE', value, name });
  },

  // Update form, runWorkflow properties
  updateRunCmdSelected: (dispatch, values) => {
    dispatch({ type: 'UPDATE_RUN_CMD_SELECTED', values });
  },
  updateRunCmdValue: (dispatch, value, name) => {
    dispatch({ type: 'UPDATE_RUN_CMD_VALUE', value, name });
  },
};

export default formActionCreators;
