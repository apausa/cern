import {
  Input, Tab, Tabs,
} from '@nextui-org/react';
import React, { Key, useEffect } from 'react';

// Components
import AdvancedMode from './modes/AdvancedMode';
import DefaultMode from './modes/DefaultMode';

// Types
import { FormProps } from '@/(private)/_types/components/formTypes';

// Utils
import { getCurrentDate } from '@/(private)/_utils/getDate';

// Actions
import formActionCreators from '@/(private)/_lib/actions/formActions';

// Constants
import getScript from '@/(private)/_utils/getScript';

export default function Form({ form, dispatchForm }: FormProps) {
  useEffect((): void => {
    formActionCreators.updateFormScript(dispatchForm, getScript(form.buildCmd, form.runCmd));
  }, [form.buildCmd.args, form.runCmd.args]);

  return (
    <form>
      <Input
        className="pb-2"
        type="text"
        label="Write title"
        variant="faded"
        color="default"
        value={form.title}
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
        value={form.version}
        onValueChange={(value: string) => {
          formActionCreators.updateFormVersion(dispatchForm, value);
        }}
      />
      <Tabs
        aria-label="Select mode"
        className="pt-2 m-0 flex flex-col"
        selectedKey={form.advanced ? 'advanced' : 'default'}
        onSelectionChange={(key: Key) => {
          formActionCreators.updateFormAdvanced(dispatchForm, key === 'advanced');
        }}
      >
        <Tab key="default" title="Default mode" className="flex flex-col">
          <DefaultMode
            buildCmd={form.buildCmd}
            runCmd={form.runCmd}
            dispatchForm={dispatchForm}
          />
        </Tab>
        <Tab key="advanced" title="Advanced mode" className="flex flex-col">
          <AdvancedMode script={form.script} dispatchForm={dispatchForm} />
        </Tab>
      </Tabs>
    </form>
  );
}
