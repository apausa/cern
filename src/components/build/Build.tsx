import {
  Button, Divider, Input, Switch,
} from '@nextui-org/react';
import React, { useEffect } from 'react';

// Components
import AdvancedMode from './AdvancedMode';
import DefaultMode from './defaultMode/DefaultMode';

// Types
import { FormProps } from '@/types/components/build';

// Utils
import getCmdStr from '@/utils/getCmd';
import { getCurrentDate } from '@/utils/getDate';

// Actions
import formActionCreators from '@/lib/actions/form';
import metadataActionCreators from '@/lib/actions/metadata';
import INITIAL_FORM from '@/lib/constants/form';

export default function Build({ form, dispatchForm, dispatchMetadata }: FormProps) {
  // Handlers
  const handleStage = (): void => {
    formActionCreators.createForm(dispatchForm, INITIAL_FORM);
    metadataActionCreators.createMetadata(dispatchMetadata, form);
  };
  const handleReset = (): void => {
    formActionCreators.createForm(dispatchForm, INITIAL_FORM);
  };

  useEffect((): void => {
    formActionCreators.updateFormCmdStr(dispatchForm, getCmdStr(form.cmdObj));
  }, [form.cmdObj]);

  return (
    <>
      <header className="flex justify-between p-4">
        <div className="pt-2">Job configuration</div>
        <Button color="primary" onClick={handleStage}>Stage</Button>
      </header>
      <Divider />
      <main className="p-4">
        <form>
          <Input
            className="py-4"
            type="text"
            label="Write title"
            variant="bordered"
            value={form.title}
            placeholder="Placeholder"
            onValueChange={(value: string) => (
              formActionCreators.updateFormTitle(dispatchForm, value))}
          />
          <Input
            className="py-4"
            label="Select version"
            type="date"
            min="2021-09-22"
            max={getCurrentDate()}
            value={form.selectedDate}
            onValueChange={(value: string) => {
              formActionCreators.updateFormSelectedDate(dispatchForm, value);
            }}
          />
          <fieldset className="py-4">
            <Switch
              className="pb-4"
              isSelected={form.advanced}
              onValueChange={(value: boolean) => (
                formActionCreators.updateFormAdvanced(dispatchForm, value))}
            >
              Advanced mode
            </Switch>
            {form.advanced
              ? (<AdvancedMode cmdStr={form.cmdStr} dispatchForm={dispatchForm} />)
              : (<DefaultMode cmdObj={form.cmdObj} dispatchForm={dispatchForm} />
              )}
          </fieldset>
        </form>
      </main>
      <Divider />
      <footer className="p-4">
        <Button color="default" onClick={handleReset}>Reset</Button>
      </footer>
    </>
  );
}
