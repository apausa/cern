'use client';

import React, { useReducer } from 'react';
import inputReducer from '@/state/reducers/inputReducers';

export default async function Build({ handleSubmit }: any) {
  const [state, dispatch]: any = useReducer(inputReducer, {
    command: '/cvmfs/alice.cern.ch/containers/bin/apptainer/current/bin/apptainer',
    arguments: {
      argument0: 'exec',
      argument1: '-C',
      argument2: '-B',
      argument3: '/cvmfs:/cvmfs,/tmp:/tmp,/work:/work',
      argument4: '--pwd',
      argument5: '/work',
      argument6: '/cvmfs/alice.cern.ch/containers/fs/singularity/rel8-alice-20220503',
      argument7: '/bin/bash',
      argument8: '-c',
      argument9: '/work/script.sh',
    },
  });

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
