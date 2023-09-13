import { Tab, Tabs } from '@nextui-org/react';
import React from 'react';

// Components
import TabContent from './tabs/TabContent';

// Types
import { Simulation, SimulationAction } from '@/_private/types/lib/simulationTypes';

export default function SimulationDetails({
  selectedSimulation, dispatchSimulation,
}: {
  selectedSimulation: Simulation,
  dispatchSimulation: React.Dispatch<SimulationAction>,
}) {
  return (
    <div className="mb-2">
      <Tabs aria-label="Select environment" className="m-0 py-2 flex flex-col">
        <Tab
          key="Visualize workflow"
          title="Visualize workflow"
          className="px-0 py-2 flex flex-col"
        >
          <TabContent
            dispatchSimulation={dispatchSimulation}
            selectedSimulation={selectedSimulation}
            script="localCreateWorkflow"
          />
        </Tab>
        <Tab
          key="Local run workflow"
          title="Local run"
          className="px-0 py-2 flex flex-col"
        >
          <TabContent
            dispatchSimulation={dispatchSimulation}
            selectedSimulation={selectedSimulation}
            script="localRunWorkflow"
          />
        </Tab>
        <Tab
          key="WLCG run workflow"
          title="WLCG run"
          className="px-0 py-2 flex flex-col"
        >
          <TabContent
            dispatchSimulation={dispatchSimulation}
            selectedSimulation={selectedSimulation}
            script="gridRunWorkflow"
          />
        </Tab>
      </Tabs>
    </div>
  );
}
