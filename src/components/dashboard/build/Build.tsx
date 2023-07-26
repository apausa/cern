'use client';

import React, { useReducer } from 'react';

// Components
import InputNumber from './InputNumber';
import InputRadio from './InputRadio';
import InputCheckbox from './InputCheckbox';

// Lib
import buildReducer from '@/lib/reducers/buildReducer';
import initialState from '@/lib/constants/buildConstants';

// Types
import {
  BashScript, EvalCmd, O2Cmd, O2CmdNumberArg, O2CmdTGeantArg,
} from '@/types/dashboard/build';

export default function Build({ handleCreateSimulation }: any) {
  const [buildState, dispatch]: [BashScript, any] = useReducer(buildReducer, initialState);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleCreateSimulation(buildState);
  };

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

            {(command.name === 'eval') && (
              <>
                <p>{command.args[0]}</p>
                <br />
                <br />
              </>
            )}
            {(command.name === 'o2-sim') && (command.args.map((arg) => (
              <div key={arg!.name}>
                <br />
                <InputCheckbox arg={arg!} dispatch={dispatch} />
                {arg?.input.type === 'number' && <InputNumber arg={arg as O2CmdNumberArg} dispatch={dispatch} />}
                {arg?.input.type === 'radio' && <InputRadio arg={arg as O2CmdTGeantArg} dispatch={dispatch} />}
              </div>
            )))}

          </fieldset>
        ))}
        <br />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}
