'use client';

import React, { useReducer } from 'react';

import buildReducer from '@/state/reducers/buildReducer';
import { initialArgument } from '@/state/constants/buildConstants';
import checkInput from '@/state/actions/buildActions';

export default async function Build({ handleSubmit }: any) {
  const [state, dispatch]: any = useReducer(buildReducer, initialArgument);
  const handleChange = (event: any) => { dispatch(checkInput(event)); };

  return (
    <div className="pt-20 pl-4 h-screen border-l-2">
      <h2 className="font-bold">Build</h2>
      <form onSubmit={() => handleSubmit}>
        <legend>{state.command}</legend>
        {
          state.arguments.map((argument: any, index: number) => (
            <>
              <label htmlFor={`${index}`}>{argument.description}</label>
              <input
                type="checkbox"
                id={`${index}`}
                name={argument.description}
                checked={argument.status}
                onChange={handleChange}
                disabled
              />
            </>
          ))
        }
        <input type="submit" value="Run simulation" />
      </form>
    </div>
  );
}
