import { Tab, Tabs } from '@nextui-org/react';
import React from 'react';

// Types
import { DetailsProps } from '@/_private/types/components/simulationTypes';

// Components
import ReadOnlyInput from './inputs/ReadOnlyInput';

// Utils
import { getSelectedVersion } from '@/_private/utils/getDate';

// Components
import LocalCreateWorkflowTab from './tabs/LocalCreateWorkflowTab';
import LocalRunWorkflowTab from './tabs/LocalRunWorkflowTab';
import GridRunWorkflowTab from './tabs/GridRunWorkflowTab';

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
          <Tab
            key="Visualize workflow"
            title="Visualize workflow"
            className="px-0 py-2 flex flex-col"
          >
            <LocalCreateWorkflowTab
              dispatchSimulation={dispatchSimulation}
              selectedSimulation={selectedSimulation}
            />
          </Tab>
          <Tab
            key="Local run workflow"
            title="Local run workflow"
            className="px-0 py-2 flex flex-col"
          >
            <LocalRunWorkflowTab
              dispatchSimulation={dispatchSimulation}
              selectedSimulation={selectedSimulation}
            />
          </Tab>
          <Tab
            key="WLCG run workflow"
            title="WLCG run workflow"
            className="px-0 py-2 flex flex-col"
          >
            <GridRunWorkflowTab
              dispatchSimulation={dispatchSimulation}
              selectedSimulation={selectedSimulation}
            />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
