import { Button, Divider, Switch } from '@nextui-org/react';
import React, { useEffect, useReducer } from 'react';

// Components
import SelectVersion from './SelectVersion';
import AdvancedMode from './AdvancedMode';
import DefaultMode from './defaultMode/DefaultMode';
import { BuildUseReducer, FormProps } from '@/types/build';

// Lib
import initialForm from '@/lib/constants/build';
import buildReducer from '@/lib/reducers/form';
import getCmdStr from '@/utils/getCmd';

export default function Build({ createMetadata }: FormProps) {
  const [form, dispatch]: BuildUseReducer = useReducer(buildReducer, initialForm);

  // Reducer actions
  const setSelectedDate = (selectedDate: string): void => { dispatch({ type: 'SET_SELECTED_DATE', selectedDate }); };
  const setAdvancedMode = (mode: boolean): void => { dispatch({ type: 'SET_ADVANCED_MODE', mode }); };
  const setCmdStr = (cmdStr: string): void => { dispatch({ type: 'SET_CMD_STR', cmdStr }); };
  const setCmdObjArguments = (keys: Selection): void => { dispatch({ type: 'SET_CMD_OBJ_ARGUMENT', keys }); };
  const setCmdObjValues = (key: string, name: string): void => { dispatch({ type: 'SET_CMD_OBJ_VALUE', key, name }); };

  const handleClick = (): void => {
    createMetadata(form);
  };

  useEffect((): void => { setCmdStr(getCmdStr(form.cmdObj)); }, [form.cmdObj]);

  return (
    <>
      <header className="flex justify-between m-4">
        <Button color="default">Restart</Button>
        <Button color="primary" onClick={handleClick}>Submit</Button>
      </header>
      <Divider />
      <main>
        <form>
          <SelectVersion selectedDate={form.selectedDate} setSelectedDate={setSelectedDate} />
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
