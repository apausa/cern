import {
  Accordion, AccordionItem, Button, Input, Textarea,
} from '@nextui-org/react';
import React, { useCallback } from 'react';

// Components
import Link from 'next/link';
import StdoutData from './outputs/StdoutData';
import StderrData from './outputs/StderrData';

// Utils
import { getStatusColor } from '@/_private/utils/getStatus';

// Actions
import simulationActionCreators from '@/_private/lib/actions/simulationActions';

// Types
import { Simulation, UpdateSimulationAction } from '@/_private/types/lib/simulationTypes';

export default function SimulationTab(
  {
    dispatchSimulation, selectedSimulation, script,
  }:
  {
    dispatchSimulation: React.Dispatch<UpdateSimulationAction>,
    selectedSimulation: Simulation,
    script: 'localRunWorkflow' | 'gridRunWorkflow',
  },
) {
  const {
    id,
    scripts: {
      [script]: {
        scriptBody, scriptPath, scriptStatus, stderrData, stdoutData,
      },
    },
  }: Simulation = selectedSimulation;

  const handleRunSimulationScript = useCallback((): void => {
    simulationActionCreators.updateSimulationScriptStatus(
      dispatchSimulation,
      selectedSimulation,
      script,
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
        color={getStatusColor(scriptStatus)}
        isDisabled={scriptStatus === 'Running'}
        isLoading={scriptStatus === 'Running'}
        onClick={handleRunSimulationScript}
      >
        Run script
      </Button>
      {script === 'localRunWorkflow' && (
      <Button
        className="my-2"
        as={Link}
        href={`/simulation/${id}/graphviz`}
        target="_blank"
      >
        Open visualization
      </Button>
      )}
      <Input
        className="py-2"
        type="text"
        color="default"
        label="Path"
        isReadOnly
        value={scriptPath}
        variant="bordered"
      />
      <Textarea
        className="pt-2 pb-1"
        isReadOnly
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
    </>
  );
}
