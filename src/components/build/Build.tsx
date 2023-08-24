import {
  Button, Divider, Input, Switch,
} from '@nextui-org/react';
import React, { useEffect } from 'react';

// Components
import SelectVersion from './SelectVersion';
import AdvancedMode from './AdvancedMode';
import DefaultMode from './defaultMode/DefaultMode';

// Types
import { FormProps } from '@/types/components/build';

// Utils
import getCmdStr from '@/utils/getCmd';

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
            onValueChange={(value: string) => (
              formActionCreators.updateFormTitle(dispatchForm, value))}
          />
          <SelectVersion selectedDate={form.selectedDate} dispatchForm={dispatchForm} />
          <Switch
            className="p-4"
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
        </form>
      </main>
    </>
  );
}
