'use client';

import React, { useReducer } from 'react';

import buildReducer from '@/lib/reducers/buildReducer';
import { buildConstants, initialArgument } from '@/lib/constants/buildConstants';

export default function Build({ handleCreateSimulation }: any) {
  const [buildState, dispatch]: any = useReducer(buildReducer, initialArgument);

  const handleChange = (event: any) => { dispatch({ type: buildConstants.UPDATE_INPUT, event }); };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleCreateSimulation(buildState);
  };

  return (
    <div className="pt-20 pl-4 h-screen border-l-2 overflow-auto">
      <h2 className="font-bold">Build</h2>
      <form onSubmit={handleSubmit}>
        <legend>{buildState.command}</legend>
        {
          buildState.clientArgs.map((argument: any, index: number) => (
            <div key={`${index}`}>
              <input
                className="rounded text-pink-500"
                type="checkbox"
                id={`${index}`}
                name={`${index}`}
                checked={argument.status}
                onChange={handleChange}
                disabled
              />
              <label htmlFor={`${index}`}>{argument.description}</label>
            </div>
          ))
        }
        <br />
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
