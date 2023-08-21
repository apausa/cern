'use client';

import React, {
  useReducer, SyntheticEvent, useEffect,
} from 'react';
import {
  Divider, Button, Switch,
} from '@nextui-org/react';

// Utils
import { getCmdStr } from '@/utils/getCmd';

// Components
import SelectVersion from './inputs/DateInput';
import AdvancedMode from './AdvancedMode';
import DefaultMode from './DefaultMode';

// Lib
import initialForm from '@/lib/constants/build';
import formReducer from '@/lib/reducers/form';

export default function Form({ handleClick }: any) {
  const [form, dispatchForm]: any = useReducer(formReducer, initialForm);

  const setDate = (date: string): void => { dispatchForm({ type: 'SET_DATE', date }); };
  const setCmdStr = (cmdStr: string): void => { dispatchForm({ type: 'SET_CMD_STR', cmdStr }); };
  const setCmdObjArguments = (keys: Selection): void => { dispatchForm({ type: 'SET_CMD_OBJ_ARGUMENT', keys }); };
  const setCmdObjValues = (key: string, name: string): void => { dispatchForm({ type: 'SET_CMD_OBJ_VALUE', key, name }); };
  const setAdvancedMode = (mode: boolean): void => { dispatchForm({ type: 'SET_ADVANCED_MODE', mode }); };

  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    handleClick();
    // @continue, if advancedMode is selected...
  };

  useEffect((): void => { setCmdStr(getCmdStr(form.cmdObj)); }, [form.cmdObj]);

  return (
    <div className="basis-128 flex-none h-screen border-r">
      <header className="m-4">
        <Button color="secondary" onClick={handleClick}>Return</Button>
        <Button color="primary" onAuxClick={handleSubmit}>Submit</Button>
      </header>
      <Divider />
      <main>
        <form>
          <SelectVersion date={form.date} setDate={setDate} />
          <Switch className="p-4" isSelected={form.advancedMode} onValueChange={setAdvancedMode}>Advanced mode</Switch>
          {form.advancedMode
            ? (<AdvancedMode cmdStr={form.cmdStr} setCmdStr={setCmdStr} />)
            : (
              <DefaultMode
                cmdObj={form.cmdObj}
                setCmdObjArguments={setCmdObjArguments}
                setCmdObjValues={setCmdObjValues}
              />
            )}
        </form>
      </main>
    </div>

  );
}
