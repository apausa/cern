/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import React, {
  useReducer, useState, useEffect, SyntheticEvent,
} from 'react';
import {
  Divider, Switch,
} from '@nextui-org/react';

// Utils
import { getParsedCurrentDate } from '@/utils/getDate';

import { getO2CmdStr } from '@/utils/getCmd';
import { O2CmdObjUseReducer, StrUseState } from '@/types/build';

// Components
import SelectVersion from './selectVersion/SelectVersion';
import AdvancedMode from './advancedMode/AdvancedMode';

// Lib
import buildReducer from '@/lib/reducers/build';
import initialO2CmdObj from '@/lib/constants/build';
import DefaultMode from './defaultMode/DefaultMode';

export default function Form() {
  const [advancedMode, setAdvancedMode]: any = useState(false);
  const [selectedDate, setSelectedDate]: StrUseState = useState(getParsedCurrentDate());
  const [o2CmdObj, dispatch]: O2CmdObjUseReducer = useReducer(buildReducer, initialO2CmdObj);
  const [o2CmdStr, setO2CmdStr]: StrUseState = useState(getO2CmdStr(o2CmdObj));

  useEffect((): void => { setO2CmdStr(getO2CmdStr(o2CmdObj)); }, [o2CmdObj]);

  return (
    <form>
      <SelectVersion selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <Divider />
      <Switch isSelected={advancedMode} onValueChange={setAdvancedMode}>Advanced mode</Switch>
      <Divider />
      {advancedMode
        ? (<AdvancedMode o2CmdStr={o2CmdStr} setO2CmdStr={setO2CmdStr} />)
        : (<DefaultMode o2CmdObj={o2CmdObj} dispatch={dispatch} />)}
    </form>
  );
}
