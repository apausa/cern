import { Tab, Tabs } from '@nextui-org/react';
import React from 'react';

// Types
import { DetailsProps } from '@/_private/types/components/simulationTypes';

// Components
import ReadOnlyInput from './inputs/ReadOnlyInput';
import TestTab from './tabs/TestTab';
import GridTab from './tabs/GridTab';

// Utils
import { getSelectedVersion } from '@/_private/utils/getDate';

export default function Details({
  selectedSimulation, dispatchSimulation,
}: DetailsProps) {
  return (
    <>
      <ReadOnlyInput
        variant="bordered"
        color="default"
        label="Assigned ID"
        value={selectedSimulation.id}
      />
      <ReadOnlyInput
        variant="bordered"
        color="default"
        label="Selected version"
        value={getSelectedVersion(selectedSimulation.form.version)}
      />
      <div className="mb-2">
        <Tabs aria-label="Select environment" className="m-0 py-2 flex flex-col">
          <Tab key="local" title="Local script" className="px-0 py-2 flex flex-col">
            <TestTab
              dispatchSimulation={dispatchSimulation}
              selectedSimulation={selectedSimulation}
            />
          </Tab>
          <Tab key="wlcg" title="WLCG script" className="px-0 py-2 flex flex-col">
            <GridTab
              dispatchSimulation={dispatchSimulation}
              selectedSimulation={selectedSimulation}
            />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
