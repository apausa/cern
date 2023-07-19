'use client';

import React, { useReducer } from 'react';

import buildReducer from '@/state/reducers/buildReducer';
import { initialArgument } from '@/state/constants/buildConstants';
import updateInput from '@/state/actions/buildActions';

export default async function Build({ handleCreateSimulation }: any) {
  const [state, dispatch]: any = useReducer(buildReducer, initialArgument);
  const handleChange = (event: any) => { dispatch(updateInput(event)); };
  const handleSubmit = () => { handleCreateSimulation(state); };

  return (
    <div className="pt-20 pl-4 h-screen border-l-2">
      <h2 className="font-bold">Build</h2>
      <form onSubmit={handleSubmit}>
        <legend>{state.command}</legend>
        {
          state.arguments.map((argument: any, index: number) => (
            <>
              <label htmlFor={`${index}`}>{argument.description}</label>
              <input
                type="checkbox"
                id={`${index}`}
                name={`${index}`}
                checked={argument.status}
                onChange={handleChange}
              />
            </>
          ))
        }
        <input type="submit" value="Run simulation" />
      </form>
    </div>
  );
}
