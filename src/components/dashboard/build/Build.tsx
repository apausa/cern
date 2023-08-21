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
import buildReducer from '@/lib/reducers/form';

export default function Build({ createMetadata, handleClick }: any) {
  const [form, dispatch]: any = useReducer(buildReducer, initialForm);

  const setDate = (date: string): void => { dispatch({ type: 'SET_DATE', date }); };
  const setCmdStr = (cmdStr: string): void => { dispatch({ type: 'SET_CMD_STR', cmdStr }); };
  const setCmdObjArguments = (keys: Selection): void => { dispatch({ type: 'SET_CMD_OBJ_ARGUMENT', keys }); };
  const setCmdObjValues = (key: string, name: string): void => { dispatch({ type: 'SET_CMD_OBJ_VALUE', key, name }); };
  const setAdvancedMode = (mode: boolean): void => { dispatch({ type: 'SET_ADVANCED_MODE', mode }); };

  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    handleClick();
    createMetadata(form);
  };

  useEffect((): void => { setCmdStr(getCmdStr(form.cmdObj)); }, [form.cmdObj]);

  return (
    <>
      <header className="flex justify-between m-4">
        <Button color="secondary" onClick={handleClick}>Return</Button>
        <Button color="primary" onClick={handleSubmit}>Submit</Button>
      </header>
      <Divider />
      <main>
        <form>
          <SelectVersion date={form.date} setDate={setDate} />
          <Switch className="p-4" isSelected={form.advanced} onValueChange={setAdvancedMode}>Advanced mode</Switch>
          {form.advanced
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
    </>
  );
}
