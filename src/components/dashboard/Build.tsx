'use client';

import React, { useReducer } from 'react';

import buildReducer from '@/state/reducers/buildReducer';
import { initialArgument } from '@/state/constants/buildConstants';

export default async function Build({ handleSubmit }: any) {
  const [state, dispatch]: any = useReducer(buildReducer, initialArgument);

  return (
    <div className="pt-20 pl-4 h-screen border-l-2">
      <h2 className="font-bold">Build</h2>
      <form onSubmit={() => handleSubmit}>
        <legend>{state[0].command}</legend>
        {
          Object.keys(state[0].arguments).map((key: any) => (
            <>
              <label htmlFor={key}>{key}</label>
              <input
                type="checkbox"
                id={key}
                name={key}
                onChange={handleOnChange}
                checked
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
