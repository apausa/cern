import {
  Button, Divider, Input, Switch,
} from '@nextui-org/react';
import React, { useEffect } from 'react';

// Components
import SelectVersion from './SelectVersion';
import AdvancedMode from './AdvancedMode';
import DefaultMode from './defaultMode/DefaultMode';

// Types
import { FormProps } from '@/types/build';

// Utils
import getCmdStr from '@/utils/getCmd';

// Actions
import formActions from '@/lib/actions/form';

export default function Build({ form, dispatchForm, createMetadata }: FormProps) {
  // Handlers
  const handleStage = (): void => {
    formActions.resetForm(dispatchForm);
    createMetadata(form);
  };
  const handleReset = (): void => {
    formActions.resetForm(dispatchForm);
  };

  useEffect((): void => {
    formActions.setCmdStr(dispatchForm, getCmdStr(form.cmdObj));
  }, [form.cmdObj]);

  return (
    <>
      <header className="flex justify-between m-4">
        <Button color="default" onClick={handleReset}>Reset</Button>
        <Button color="primary" onClick={handleStage}>Stage</Button>
      </header>
      <Divider />
      <main>
        <form>
          <Input
            className="p-4"
            type="text"
            label="Write title"
            value={form.title}
            placeholder="Sandro's job"
            onValueChange={(value: string) => formActions.setTitle(dispatchForm, value)}
          />
          <SelectVersion selectedDate={form.selectedDate} dispatchForm={dispatchForm} />
          <Switch
            className="p-4"
            isSelected={form.advanced}
            onValueChange={(value: boolean) => formActions.setAdvanced(dispatchForm, value)}
          >
            Advanced mode
          </Switch>
          {form.advanced
            ? (<AdvancedMode cmdStr={form.cmdStr} dispatchForm={dispatchForm} />)
            : (<DefaultMode cmdObj={form.cmdObj} dispatchForm={dispatchForm} />
            )}
        </form>
      </main>
    </>
  );
}
