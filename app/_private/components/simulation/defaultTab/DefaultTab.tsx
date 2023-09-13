import { Accordion, AccordionItem, Button } from '@nextui-org/react';
import React, { useCallback } from 'react';

// Components
import ReadOnlyInput from '../inputs/ReadOnlyInput';
import ReadOnlyTextarea from '../inputs/ReadOnlyTextarea';
import StdoutData from './outputData/StdoutData';
import StderrData from './outputData/StderrData';

// Utils
import { getStatusColor, getStatusName } from '@/_private/utils/getStatus';

// Actions
import simulationActionCreators from '@/_private/lib/actions/simulationActions';

// Types
import { Simulation, UpdateSimulationAction } from '@/_private/types/lib/simulationTypes';

export default function DefaultTab(
  {
    dispatchSimulation, selectedSimulation, script,
  }:
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
        className="mb-2"
        color="primary"
        isDisabled={scriptStatus === 'PENDING'}
        onClick={handleRunSimulationScript}
      >
        Run
      </Button>
      <ReadOnlyInput
        color={getStatusColor(scriptStatus)}
        label="Status"
        value={getStatusName(scriptStatus)}
        variant="bordered"
      />
      <ReadOnlyInput
        color="default"
        label="Path"
        value={scriptPath}
        variant="bordered"
      />
      <ReadOnlyTextarea
        color="default"
        label="Content"
        value={scriptBody}
        variant="bordered"
      />
      <Accordion isCompact className="my-2" variant="bordered">
        <AccordionItem
          key="1"
          aria-label="Stdin output"
          title="Stdin output"
          isDisabled={!stdoutData}
        >
          <StdoutData stdoutData={stdoutData as string} />
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Stderr output"
          title="Stderr output"
          isDisabled={!stderrData}
        >
          <StderrData stderrData={stderrData as string} />
        </AccordionItem>
      </Accordion>
      <Button
        className="my-2"
        isDisabled={scriptStatus === 'FULFILLED'}
        onClick={handleUpdateSimulationScriptStatus}
      >
        Set as &apos;completed&apos;
      </Button>
    </>
  );
}
