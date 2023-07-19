'use client';

import React, { useReducer } from 'react';

import buildReducer from '@/state/reducers/buildReducer';
import { buildConstants, initialArgument } from '@/state/constants/buildConstants';

export default function Build({ handleCreateSimulation }: any) {
  const [state, dispatch]: any = useReducer(buildReducer, initialArgument);

  const handleSubmit = () => { handleCreateSimulation(state); };
  const handleChange = (event: any) => {
    dispatch({ type: buildConstants.UPDATE_INPUT, event });
  };

  return (
    <div className="pt-20 pl-4 h-screen border-l-2">
      <h2 className="font-bold">Build</h2>
      <form onSubmit={handleSubmit}>
        <p>{state.command}</p>
        <br />
        <legend>Arguments</legend>
        {
          state.arguments.map((argument: any, index: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`${index}`}>
              <label htmlFor={`${index}`}>{argument.description}</label>
              <input
                className="rounded text-pink-500"
                type="checkbox"
                id={`${index}`}
                name={`${index}`}
                checked={argument.status}
                onChange={handleChange}
              />
            </div>
          ))
        }
        <br />
        <input type="submit" value="Run simulation" />
      </form>
    </div>
  );
}
