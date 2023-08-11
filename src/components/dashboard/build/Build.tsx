'use client';

import React, { useReducer } from 'react';

// Components
import FormNumber from './default/FormNumber';
import FormRadio from './default/FormRadio';
import FormCheckbox from './default/FormCheckbox';

// Lib
import buildReducer from '@/lib/reducers/build';
import initialState from '@/lib/constants/build';

// Types
import {
  BuildUseReducer, EvalCmd, O2Cmd, O2CmdNumberArg, O2CmdTGeantArg,
} from '@/types/build';
import { BuildProps } from '@/types/dashboard';

export default function Build({ handlePostSimulation }: BuildProps) {
  const [buildState, dispatch]: BuildUseReducer = useReducer(buildReducer, initialState);

  return (
    <div className="pt-20 pl-4 h-screen border-l-2 overflow-auto">
      <h2 className="font-bold">Build</h2>
      <br />
      <br />
      <form onSubmit={(event) => handlePostSimulation(event, buildState)}>
        {buildState.map((command: EvalCmd | O2Cmd) => (
          <fieldset key={command.name}>

            <legend>{command.description}</legend>
            <p>{command.name}</p>
            {(command.args.map((arg) => (
              <div key={arg!.name}>
                <br />
                <FormCheckbox arg={arg!} dispatch={dispatch} />
                {arg!.input.type === 'number' && <FormNumber arg={arg as O2CmdNumberArg} dispatch={dispatch} />}
                {arg!.input.type === 'radio' && <FormRadio arg={arg as O2CmdTGeantArg} dispatch={dispatch} />}
              </div>
            )))}
            <br />
            <br />
          </fieldset>
        ))}
        <input type="submit" value="[BUTTON] Run in test environment" />
      </form>
    </div>
  );
}

// const [dashboardState, dispatch]: DashboardUseReducer = useReducer(dashboardReducer, []);

// const handlePutSimulation: HandlePutSimulation = async (simulation) => {
//   const unresolvedSimulation: Simulation = setPending(simulation);
//   dispatch({ type: 'UPDATE_SIMULATION', simulation: unresolvedSimulation });

//   const resolvedSimulation: Simulation = await putSimulation(unresolvedSimulation);
//   dispatch({ type: 'UPDATE_SIMULATION', simulation: resolvedSimulation });
// };

// const handlePostSimulation: HandlePostSimulation = async (event, buildState) => {
//   event.preventDefault();

//   const createdSimulation: Simulation = await postSimulation(buildState);
//   dispatch({ type: 'CREATE_SIMULATION', simulation: createdSimulation });

//   handlePutSimulation(createdSimulation);
// };
