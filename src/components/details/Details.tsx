import { Button, Tab, Tabs } from '@nextui-org/react';
import React from 'react';

// Types
import { DetailsProps } from '@/types/components/details';

// Actions
import formActionCreator from '@/lib/state/actions/form';

// Components
import ReadOnlyInput from './details/ReadOnlyInput';

// Utils
import { getSelectedVersion } from '@/utils/getDate';
import tableActionCreators from '@/lib/state/actions/table';
import TestTab from './tabs/TestTab';
import GridTab from './tabs/GridTab';

export default function Details({
  selectedMetadata, dispatchForm, dispatchMetadata, dispatchTable,
}: DetailsProps) {
  const handleCreateForm = (): void => {
    tableActionCreators.updateSelectedKey(dispatchTable, new Set(['']));
    formActionCreator.createForm(dispatchForm, selectedMetadata.form);
  };

  return (
    <>
      <header className="pl-4 pr-8 py-5 border-b border-b-neutral-800">
        <div className="pt-2">Job details</div>
      </header>
      <main className="pl-4 pr-8 pt-4 border-b border-b-neutral-800">
        <ReadOnlyInput
          variant="bordered"
          color="default"
          label="Written title"
          value={selectedMetadata.form.title}
        />
        <ReadOnlyInput
          variant="bordered"
          color="default"
          label="Selected version"
          value={getSelectedVersion(selectedMetadata.form.selectedDate)}
        />
        <Tabs aria-label="Select environment" className="pt-2 flex flex-col">
          <Tab key="local" title="Local tab" className="flex flex-col">
            <TestTab dispatchMetadata={dispatchMetadata} selectedMetadata={selectedMetadata} />
          </Tab>
          <Tab key="wlcg" title="WLCG tab" className="flex flex-col">
            <GridTab dispatchMetadata={dispatchMetadata} selectedMetadata={selectedMetadata} />
          </Tab>
        </Tabs>
      </main>
      <footer className="pl-4 pr-8 py-4 flex flex-col">
        <Button onClick={handleCreateForm}>Recreate</Button>
      </footer>
    </>
  );
}
