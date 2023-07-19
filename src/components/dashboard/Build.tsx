'use client';

import React, { useReducer } from 'react';
import buildReducer from '@/state/reducers/buildReducer';

export default async function Build({ handleSubmit }: any) {
  const [state, dispatch]: any = useReducer(buildReducer, {
    command: '/cvmfs/alice.cern.ch/containers/bin/apptainer/current/bin/apptainer',
    arguments: {
      argument0: { value: 'exec', status: true },
      argument1: { value: '-C', status: true },
      argument2: { value: '-B', status: true },
      argument3: { value: '/cvmfs:/cvmfs,/tmp:/tmp,/work:/work', status: true },
      argument4: { value: '--pwd', status: true },
      argument5: { value: '/work', status: true },
      argument6: { value: '/cvmfs/alice.cern.ch/containers/fs/singularity/rel8-alice-20220503', status: true },
      argument7: { value: '/bin/bash', status: true },
      argument8: { value: '-c', status: true },
      argument9: { value: '/work/script.sh', status: true },
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
