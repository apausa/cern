import { Accordion, AccordionItem, Button } from '@nextui-org/react';
import React, { useCallback } from 'react';

// Components
import ReadOnlyInput from '../inputs/ReadOnlyInput';
import ReadOnlyTextarea from '../inputs/ReadOnlyTextarea';

// Utils
import { getStatusColor, getStatusName } from '@/_private/utils/getStatus';

// State
import simulationActionCreators from '@/_private/lib/actions/simulationActions';

// Types
import { Simulation, UpdateSimulationAction } from '@/_private/types/components/simulationTypes';

// Constants
import StdoutData from './StdoutData';
import StderrData from './StderrData';

export default function TabContent(
  { dispatchSimulation, selectedSimulation, script }:
  {
    dispatchSimulation: React.Dispatch<UpdateSimulationAction>,
    selectedSimulation: Simulation,
    script: 'localRunWorkflow' | 'localCreateWorkflow' | 'gridRunWorkflow',
  },
) {
  const {
    scripts: {
      [script]: {
        scriptBody, scriptPath, scriptStatus, stderrData, stdoutData,
      },
    },
  } = selectedSimulation;

  const handleUpdateSimulationScriptStatus = useCallback((): void => {
    simulationActionCreators.updateSimulationScriptStatus(
      dispatchSimulation,
      selectedSimulation,
      script,
      'FULFILLED',
    );
  }, [dispatchSimulation, selectedSimulation]);

  const handleRunSimulationScript = useCallback((): void => {
    simulationActionCreators.updateSimulationScriptStatus(
      dispatchSimulation,
      selectedSimulation,
      script,
      'PENDING',
    );
    simulationActionCreators.runSimulationScript(
      dispatchSimulation,
      selectedSimulation,
      script,
    );
  }, [dispatchSimulation, selectedSimulation]);

  return (
    <>
      <Button
        className="mb-4"
        color="primary"
        isDisabled={scriptStatus === 'PENDING'}
        onClick={handleRunSimulationScript}
      >
        Run
      </Button>
      <ReadOnlyTextarea
        color="default"
        label="Content"
        value={scriptBody}
        variant="bordered"
      />
      <ReadOnlyInput
        color="default"
        label="Path"
        value={scriptPath}
        variant="bordered"
      />
      <ReadOnlyInput
        color={getStatusColor(scriptStatus)}
        label="Status"
        value={getStatusName(scriptStatus)}
        variant="bordered"
      />
      <Button
        className="my-2"
        isDisabled={scriptStatus === 'FULFILLED'}
        onClick={handleUpdateSimulationScriptStatus}
      >
        Set as &apos;completed&apos;
      </Button>
      <Accordion isCompact className="my-2" variant="bordered">
        <AccordionItem
          key="1"
          aria-label="Stdin output"
          title="Stdin output"
          isDisabled={!stdoutData}
        >
          <StdoutData stdoutData={stdoutData} />
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Stderr output"
          title="Stderr output"
          isDisabled={!stderrData}
        >
          <StderrData stderrData={stderrData} />
        </AccordionItem>
      </Accordion>
    </>
  );
}
