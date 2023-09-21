// Types
import { Form, FormActionCreators } from '@/_private/types/lib/formTypes';

// Constants
import INITIAL_FORM from '../constants/formConstants';

const formActionCreators: FormActionCreators = {
  // Read form
  readForm: (dispatch) => {
    const response: string | null = localStorage.getItem('form');
    const form: Form = (response) ? JSON.parse(response) : INITIAL_FORM;

    dispatch({ type: 'READ_FORM', form });
  },

  // Create form
  createForm: (dispatch, form) => {
    dispatch({ type: 'CREATE_FORM', form });
  },

  // Update form, createWorkflow property
  updateBuildCmdSelected: (dispatch, values) => {
    dispatch({ type: 'UPDATE_BUILD_CMD_SELECTED', values });
  },
  updateBuildCmdValue: (dispatch, value, name) => {
    dispatch({ type: 'UPDATE_BUILD_CMD_VALUE', value, name });
  },

  // Update form, unWorkflow properties
  updateRunCmdSelected: (dispatch, values) => {
    dispatch({ type: 'UPDATE_RUN_CMD_SELECTED', values });
  },
  updateRunCmdValue: (dispatch, value, name) => {
    dispatch({ type: 'UPDATE_RUN_CMD_VALUE', value, name });
  },

  // Update form, other properties
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
};

export default formActionCreators;
