'use client';

import React, { useReducer, useState } from 'react';

// Components
import SelectMode from './SelectMode';
import IntermediateForm from './intermediateForm/IntermediateForm';
import AdvancedForm from './advancedForm/AdvancedForm';

// Lib
import buildReducer from '@/lib/reducers/build';
import { initialState } from '@/lib/constants/build';

// Types
import { BuildUseReducer } from '@/types/build';

export default function Build({ handleCreateSimulation }: any) {
  const [buildState, dispatch]: BuildUseReducer = useReducer(buildReducer, initialState);
  const [isAdvanced, setIsAdvanced]: any = useState(false);
  const handleSubmit = (event: any): any => {
    event.preventDefault();
    handleCreateSimulation(buildState);
  };

  const handleUpdateTextarea = () => {
    dispatch({ type: 'UPDATE_TEXT_AREA' });
  };

  const intermediateFormHandlers: any = {
    handleUpdateRadioInput: (event: any) => {
      dispatch({ type: 'UPDATE_RADIO_INPUT', event });
    },
    handleUpdateNumberInput: (event: any) => {
      dispatch({ type: 'UPDATE_NUMBER_INPUT', event });
    },
    handleUpdateCheckboxInput: (event: any) => {
      dispatch({ type: 'UPDATE_CHECKBOX_INPUT', event });
    },
  };

  // @continue, parse object to string automatically... and send to backend so that it can be run

  return (
    <div>
      <div>Build</div>
      <br />
      <SelectMode isAdvanced={isAdvanced} setIsAdvanced={setIsAdvanced} />
      <br />
      <form onSubmit={handleSubmit}>
        {isAdvanced
          ? (
            <AdvancedForm
              handleUpdateTextarea={handleUpdateTextarea}
            />
          )
          : (
            <IntermediateForm
              buildState={buildState}
              intermediateFormHandlers={intermediateFormHandlers}
            />
          )}
        <br />
        <button type="submit">Run in test environment</button>
      </form>
    </div>
  );
}
