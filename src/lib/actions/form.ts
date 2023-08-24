/* eslint-disable max-len */

import { Metadata } from '@/types/dashboard';

const formActions = {
  resetForm: (dispatch: React.Dispatch<any>): void => {
    dispatch({ type: 'RESET_FORM' });
  },
  setForm: (dispatch: React.Dispatch<any>, metadata: Metadata): void => {
    dispatch({ type: 'SET_FORM', metadata });
  },
  setSelectedDate: (dispatch: React.Dispatch<any>, selectedDate: string): void => {
    dispatch({ type: 'SET_SELECTED_DATE', selectedDate });
  },
  setTitle: (dispatch: React.Dispatch<any>, title: string): void => {
    dispatch({ type: 'SET_TITLE', title });
  },
  setAdvanced: (dispatch: React.Dispatch<any>, mode: boolean): void => {
    dispatch({ type: 'SET_ADVANCED', mode });
  },
  setCmdStr: (dispatch: React.Dispatch<any>, cmdStr: string): void => {
    dispatch({ type: 'SET_CMD_STR', cmdStr });
  },
  setCmdObjArguments: (dispatch: React.Dispatch<any>, keys: Selection): void => {
    dispatch({ type: 'SET_CMD_OBJ_ARGUMENT', keys });
  },
  setCmdObjValues: (dispatch: React.Dispatch<any>, key: string, name: string): void => {
    dispatch({ type: 'SET_CMD_OBJ_VALUE', key, name });
  },
};

export default formActions;
