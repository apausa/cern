'use client';

import React, {
  useReducer, useState, useEffect, SyntheticEvent,
} from 'react';

// Components
import AdvancedMode from './advancedMode/AdvancedMode';
import NumberInput from './inputs/NumberInput';
import RadioInput from './inputs/RadioInput';
import CheckboxInput from './inputs/CheckboxInput';

// Lib
import buildReducer from '@/lib/reducers/build';
import { o2cmd } from '@/lib/constants/build';

// Types
import { BuildProps, BuildStateUseReducer, O2CmdUseState } from '@/types/build';

// Utils
import parseO2Cmd from '@/utils/parseO2Cmd';

export default function Build({ handleCreateSimulation }: BuildProps) {
  const [buildState, dispatch]: BuildStateUseReducer = useReducer(buildReducer, o2cmd);
  const [parsedO2Cmd, setParsedO2Cmd]: O2CmdUseState = useState('');

  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();

    handleCreateSimulation(parsedO2Cmd);
  };

  const handleUpdateValueProperty = (event: SyntheticEvent): void => {
    dispatch({ type: 'UPDATE_VALUE_PROPERTY', event });
  };

  const handleUpdateCheckedProperty = (event: SyntheticEvent): void => {
    dispatch({ type: 'UPDATE_CHECKED_PROPERTY', event });
  };

  useEffect((): void => {
    setParsedO2Cmd(parseO2Cmd(buildState));
  }, [buildState]);

  return (
    <div>
      <div>Build</div>
      <br />

      <br />
      <form onSubmit={handleSubmit}>
        {buildState.args.map((arg: any) => (
          <div key={arg.name}>
            <CheckboxInput
              arg={arg}
              handleUpdateCheckedProperty={handleUpdateCheckedProperty}
            />
            <br />
            {arg.input.type === 'number' && (
            <NumberInput
              arg={arg}
              handleUpdateValueProperty={handleUpdateValueProperty}
            />
            )}
            {arg.input.type === 'radio' && (
            <RadioInput
              arg={arg}
              handleUpdateValueProperty={handleUpdateValueProperty}
            />
            )}
            {arg.input.type !== 'radio' && arg.input.type !== 'number' && (<div>{arg.value}</div>)}
          </div>
        ))}
        <br />
        <AdvancedMode
          parsedO2Cmd={parsedO2Cmd}
          setParsedO2Cmd={setParsedO2Cmd}
        />
        <br />
        <button type="submit">Run in test environment</button>
      </form>
    </div>
  );
}
