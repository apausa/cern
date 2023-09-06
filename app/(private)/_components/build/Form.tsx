import {
  Input, Tab, Tabs,
} from '@nextui-org/react';
import React, { Key, useCallback } from 'react';

// Components
import AdvancedMode from './modes/AdvancedMode';
import DefaultMode from './modes/DefaultMode';

// Types
import { FormProps } from '@/(private)/_types/components/formTypes';

// Utils
import { getCurrentDate } from '@/(private)/_utils/getDate';

// Actions
import formActionCreators from '@/(private)/_lib/actions/formActions';

export default function Form({ form, dispatchForm }: FormProps) {
  const onTitleChange = useCallback((value: string) => {
    formActionCreators.updateFormTitle(dispatchForm, value);
  }, []);

  const onVersionChange = useCallback((value: string) => {
    formActionCreators.updateFormVersion(dispatchForm, value);
  }, []);

  const onSelectionChange = useCallback((key: Key) => {
    formActionCreators.updateFormAdvanced(dispatchForm, key === 'advanced');
  }, []);

  return (
    <form>
      <Input
        className="m-0 py-2"
        type="text"
        label="Write title"
        variant="faded"
        color="default"
        value={form.title}
        onValueChange={onTitleChange}
      />
      <Input
        className="m-0 py-2"
        label="Select version"
        type="date"
        min="2021-09-22"
        variant="faded"
        color="default"
        max={getCurrentDate()}
        value={form.version}
        onValueChange={onVersionChange}
      />
      <Tabs
        aria-label="Select mode"
        className="m-0 py-2 flex flex-col"
        selectedKey={form.advanced ? 'advanced' : 'default'}
        onSelectionChange={onSelectionChange}
      >
        <Tab key="default" title="Default mode" className="px-0 py-2 flex flex-col">
          <DefaultMode form={form} dispatchForm={dispatchForm} />
        </Tab>
        <Tab key="advanced" title="Advanced mode" className="px-0 py-2 flex flex-col">
          <AdvancedMode form={form} dispatchForm={dispatchForm} />
        </Tab>
      </Tabs>
    </form>
  );
}
