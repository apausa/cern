import { Button, Link } from '@nextui-org/react';
import React, { useReducer } from 'react';

// Actions
import formActionCreators from '@/_lib/actions/formActions';
import simulationActionCreators from '@/_lib/actions/simulationActions';

// Constants
import INITIAL_FORM from '@/_lib/constants/formConstants';

// Reducers
import simulationReducer from '@/_lib/reducers/simulationReducer';

// Types
import { UseReducer } from '@/_types/components/simulationTypes';

export default function BuildHeader({ dispatchForm, form }: any) {
  const [, dispatchSimulation]: UseReducer = useReducer(simulationReducer, []);

  const onStage = (): void => {
    formActionCreators.createForm(dispatchForm, INITIAL_FORM);
    simulationActionCreators.createSimulation(dispatchSimulation, form);
  };

  return (
    <header className="p-4 border-b border-b-neutral-800 flex justify-between gap-4">
      <div className="pt-2">Job configuration</div>
      <Button
        href="/"
        as={Link}
        color="primary"
        onClick={onStage}
      >
        Stage
      </Button>
    </header>
  );
}
