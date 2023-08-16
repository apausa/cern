'use client';

import React, {
  useReducer, useState, useEffect, SyntheticEvent,
} from 'react';

// Components
import AdvancedMode from './advancedMode/AdvancedMode';
import NumberInput from './inputs/NumberInput';
import RadioInput from './inputs/RadioInput';
import CheckboxInput from './inputs/CheckboxInput';
import DateInput from './inputs/DateInput';

// Lib
import buildReducer from '@/lib/reducers/build';
import initialO2CmdObj from '@/lib/constants/build';

// Types
import { BuildProps, O2CmdObjUseReducer, StrUseState } from '@/types/build';

// Utils
import getO2CmdStr from '@/utils/getO2CmdStr';
import { getParsedCurrentDate, getParsedSelectedDate } from '@/utils/getDate';

export default function Build({ handleCreateMetadata, setBuild }: BuildProps) {
  const [o2CmdObj, dispatch]: O2CmdObjUseReducer = useReducer(buildReducer, initialO2CmdObj);
  const [o2CmdStr, setO2CmdStr]: StrUseState = useState(getO2CmdStr(o2CmdObj));
  const [selectedDate, setSelectedDate]: StrUseState = useState(getParsedCurrentDate());

  const handleUpdateValueProperty = (event: SyntheticEvent): void => {
    dispatch({ type: 'UPDATE_VALUE_PROPERTY', event });
  };

  const handleUpdateCheckedProperty = (event: SyntheticEvent): void => {
    dispatch({ type: 'UPDATE_CHECKED_PROPERTY', event });
  };

  const handleReturn = (): void => { setBuild(false); };
  const handleSubmit = (event: SyntheticEvent): void => {
    const version = getParsedSelectedDate(selectedDate);

    event.preventDefault();

    setBuild(false);
    handleCreateMetadata(version, o2CmdStr);
  };

  useEffect((): void => { setO2CmdStr(getO2CmdStr(o2CmdObj)); }, [o2CmdObj]);

  return (
    <>
      <div>
        <button type="button" onClick={handleReturn}>Return</button>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
      <br />
      <div>
        <DateInput selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <form onSubmit={handleSubmit}>
          <br />
          {o2CmdObj.args.map((arg: any) => (
            <div key={arg.name}>
              <CheckboxInput arg={arg} handleUpdateCheckedProperty={handleUpdateCheckedProperty} />
              <div>
                {arg.input.type !== 'radio' && arg.input.type !== 'number' && (<div>{arg.value}</div>)}
                {arg.input.type === 'number' && (
                  <NumberInput arg={arg} handleUpdateValueProperty={handleUpdateValueProperty} />
                )}
                {arg.input.type === 'radio' && (
                  <RadioInput arg={arg} handleUpdateValueProperty={handleUpdateValueProperty} />
                )}
              </div>
              <br />
            </div>
          ))}
          <AdvancedMode
            o2CmdStr={o2CmdStr}
            setO2CmdStr={setO2CmdStr}
          />
          <br />
        </form>
      </div>
    </>
  );
}
