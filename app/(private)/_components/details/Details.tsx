import { Tab, Tabs } from '@nextui-org/react';
import React from 'react';

// Types
import { DetailsProps } from '@/(private)/_types/components/simulationTypes';

// Components
import ReadOnlyInput from './details/ReadOnlyInput';
import TestTab from './tabs/TestTab';
import GridTab from './tabs/GridTab';

// Utils
import { getSelectedVersion } from '@/(private)/_utils/getDate';

export default function Details({
  selectedSimulation, dispatchSimulation,
}: DetailsProps) {
  return (
    <>
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
        value={getSelectedVersion(selectedSimulation.form.version)}
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
    </>
  );
}
