'use client';

import React, { useReducer } from 'react';

import InputCheckbox from './InputCheckbox';
import InputNumber from './InputNumber';
import InputRadio from './InputRadio';

import buildReducer from '@/lib/reducers/buildReducer';
import initialState from '@/lib/constants/buildConstants';
import { BashScript, EvalCmd, O2Cmd } from '@/types/dashboard/build/buildTypes';

export default function Build({ handleCreateSimulation }: any) {
  const [buildState, dispatch]: [BashScript, any] = useReducer(buildReducer, initialState);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleCreateSimulation(buildState);
  };

  return ( // @develop
    <div className="pt-20 pl-4 h-screen border-l-2 overflow-auto">
      <h2 className="font-bold">Build</h2>
      <form onSubmit={handleSubmit}>
        {buildState.map((command: EvalCmd | O2Cmd) => (
          <fieldset>
            <legend>{command.description}</legend>
            {command.title === 'o2-sim' && (
              command.args.map((arg) => (
                <div key={arg!.title}>
                  <label htmlFor={arg!.title}>{arg!.title}</label>
                  <InputCheckbox arg={arg!} dispatch={dispatch} />
                  {arg!.isChecked && (
                    <fieldset>
                      <legend>Legend</legend>
                      {arg!.title === '-n' && <InputNumber arg={arg!} dispatch={dispatch} />}
                      {arg!.title === '-e' && <InputRadio arg={arg!} dispatch={dispatch} />}
                    </fieldset>
                  )}
                </div>
              ))
            )}
          </fieldset>
        ))}

        <input
          className="
            text-blue-700
            hover:text-white
            border
            border-blue-700
            hover:bg-blue-800
            focus:ring-4
            focus:outline-none
            focus:ring-blue-300
            font-medium
            rounded-lg
            text-sm
            px-5
            py-2.5
            text-center
            mr-2
            mb-2
            dark:border-blue-500
            dark:text-blue-500
            dark:hover:text-white
            dark:hover:bg-blue-500
            dark:focus:ring-blue-800"
          type="submit"
          value="Run simulation"
        />
      </form>
    </div>
  );
}
