'use client';

import React, { useReducer } from 'react';

// Components
import O2Fieldset from './o2Fieldset/o2Fieldset';
import EvalFieldset from './evalFieldset/EvalFIeldset';

// Lib
import buildReducer from '@/lib/reducers/buildReducer';
import initialState from '@/lib/constants/buildConstants';

// Types
import { BashScript, EvalCmd, O2Cmd } from '@/types/dashboard/build';

export default function Build({ handleCreateSimulation }: any) {
  const [buildState, dispatch]: [BashScript, any] = useReducer(buildReducer, initialState);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleCreateSimulation(buildState);
  };

  return (
    <div className="pt-20 pl-4 h-screen border-l-2 overflow-auto">
      <h2 className="font-bold">Build</h2>
      <form onSubmit={handleSubmit}>
        {buildState.map((command: EvalCmd | O2Cmd, index: number) => (
          <div key={command.title}>
            <br />
            <br />
            {index === 0 && (<EvalFieldset command={command as EvalCmd} />)}
            {index === 1 && (<O2Fieldset command={command as O2Cmd} dispatch={dispatch} />)}
          </div>
        ))}

        <br />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}
