import {
  Button, Input, Tab, Tabs,
} from '@nextui-org/react';
import React, { Key, useEffect } from 'react';

// Components
import AdvancedMode from './modes/AdvancedMode';
import DefaultMode from './modes/DefaultMode';

// Types
import { FormProps } from '@/types/components/form';

// Utils
import getCmdStr from '@/utils/getCmd';
import { getCurrentDate } from '@/utils/getDate';

// Actions
import formActionCreators from '@/lib/state/actions/form';
import metadataActionCreators from '@/lib/state/actions/metadata';

// Constants
import INITIAL_FORM from '@/lib/state/constants/form';

export default function Form({ form, dispatchForm, dispatchMetadata }: FormProps) {
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
      <header className="flex justify-between pl-4 pr-8 py-4 border-b border-b-neutral-800">
        <div className="pt-2">Job configuration</div>
        <Button
          color="primary"
          onClick={handleStage}
        >
          Stage
        </Button>
      </header>
      <main className="pl-4 pr-8 pt-4 border-b border-b-neutral-800">
        <form>
          <Input
            className="py-2"
            type="text"
            label="Write title"
            variant="faded"
            color="default"
            value={form.title}
            placeholder="Placeholder"
            onValueChange={(value: string) => (
              formActionCreators.updateFormTitle(dispatchForm, value))}
          />
          <Input
            className="py-2"
            label="Select version"
            type="date"
            min="2021-09-22"
            variant="faded"
            color="default"
            max={getCurrentDate()}
            value={form.selectedDate}
            onValueChange={(value: string) => {
              formActionCreators.updateFormSelectedDate(dispatchForm, value);
            }}
          />
          <Tabs
            aria-label="Select mode"
            className="pt-2 flex flex-col"
            selectedKey={form.advanced ? 'advanced' : 'default'}
            onSelectionChange={(key: Key) => {
              formActionCreators.updateFormAdvanced(dispatchForm, key === 'advanced');
            }}
          >
            <Tab key="default" title="Default mode" className="flex flex-col">
              <DefaultMode cmdObj={form.cmdObj} dispatchForm={dispatchForm} />
            </Tab>
            <Tab key="advanced" title="Advanced mode" className="flex flex-col">
              <AdvancedMode cmdStr={form.cmdStr} dispatchForm={dispatchForm} />
            </Tab>
          </Tabs>
        </form>
      </main>
      <footer className="pl-4 pr-8 py-4 flex flex-col">
        <Button color="default" onClick={handleReset}>Reset</Button>
      </footer>
    </>
  );
}
