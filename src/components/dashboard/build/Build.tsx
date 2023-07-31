'use client';

import React, { useReducer, useEffect } from 'react';

// Components
import FormNumber from './FormNumber';
import FormRadio from './FormRadio';
import FormCheckbox from './FormCheckbox';

// Lib
import buildReducer from '@/lib/reducers/build';
import initialState from '@/lib/constants/build';

// Types
import {
  BuildUseReducer, EvalCmd, O2Cmd, O2CmdNumberArg, O2CmdTGeantArg,
} from '@/types/build';

export default function Build({ handleCreateSimulation, handleUpdateSimulation }: any) {
  const [buildState, dispatch]: BuildUseReducer = useReducer(buildReducer, initialState);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const simulation = await handleCreateSimulation(buildState);
    await handleUpdateSimulation(simulation);
  };

  useEffect(() => {
    dispatch({ type: 'READ_FORM' });
  }, []);

  return (
    <div className="pt-20 pl-4 h-screen border-l-2 overflow-auto">
      <h2 className="font-bold">Build</h2>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        {buildState.map((command: EvalCmd | O2Cmd) => (
          <fieldset key={command.name}>

            <legend>{command.description}</legend>
            <p>{command.name}</p>
            {(command.args.map((arg) => (
              <div key={arg!.name}>
                <br />
                <FormCheckbox arg={arg!} dispatch={dispatch} />
                {arg!.input.type === 'number' && <FormNumber arg={arg as O2CmdNumberArg} dispatch={dispatch} />}
                {arg!.input.type === 'radio' && <FormRadio arg={arg as O2CmdTGeantArg} dispatch={dispatch} />}
              </div>
            )))}
            <br />
            <br />
          </fieldset>
        ))}
        <input type="submit" />
      </form>
    </div>
  );
}
