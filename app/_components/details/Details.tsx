import { Button, Tab, Tabs } from '@nextui-org/react';
import React from 'react';

// Types
import { DetailsProps } from '@/_types/components/simulationTypes';

// Actions
import formActionCreator from '@/_lib/actions/formActions';
import tableActionCreators from '@/_lib/actions/tableActions';

// Components
import ReadOnlyInput from './details/ReadOnlyInput';
import TestTab from './tabs/TestTab';
import GridTab from './tabs/GridTab';

// Utils
import { getSelectedVersion } from '@/_utils/getDate';

export default function Details({
  selectedSimulation, dispatchForm, dispatchSimulation, dispatchTable,
}: DetailsProps) {
  const handleCreateForm = (): void => {
    tableActionCreators.updateSelectedKey(dispatchTable, new Set(['']));
    formActionCreator.createForm(dispatchForm, selectedSimulation.form);
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
          value={selectedSimulation.form.title}
        />
        <ReadOnlyInput
          variant="bordered"
          color="default"
          label="Selected version"
          value={getSelectedVersion(selectedSimulation.form.selectedDate)}
        />
        <Tabs aria-label="Select environment" className="pt-2 flex flex-col">
          <Tab key="local" title="Local script" className="flex flex-col">
            <TestTab
              dispatchSimulation={dispatchSimulation}
              selectedSimulation={selectedSimulation}
            />
          </Tab>
          <Tab key="wlcg" title="WLCG script" className="flex flex-col">
            <GridTab
              dispatchSimulation={dispatchSimulation}
              selectedSimulation={selectedSimulation}
            />
          </Tab>
        </Tabs>
      </main>
      <footer className="pl-4 pr-8 py-4 flex flex-col">
        <Button onClick={handleCreateForm}>Recreate</Button>
      </footer>
    </>
  );
}
