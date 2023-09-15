import { Button } from '@nextui-org/react';
import React, {
  useCallback, useReducer,
} from 'react';
import Link from 'next/link';

import formActionCreators from '@/_private/lib/actions/formActions';

import formReducer from '@/_private/lib/reducers/formReducer';
import { Simulation, SimulationAction } from '@/_private/types/lib/simulationTypes';
import simulationActionCreators from '@/_private/lib/actions/simulationActions';

export default function SimulationFooter( // @develop
  {
    loading, isOpen, selectedSimulation, onClose, dispatchSimulation, setDeleted,
  }: {
    loading: boolean,
    isOpen: boolean,
    selectedSimulation: Simulation,
    onClose: () => void;
    dispatchSimulation: React.Dispatch<SimulationAction>,
    setDeleted: React.Dispatch<React.SetStateAction<boolean>>
  },
) {
  const [, dispatchForm] = useReducer(formReducer, null);

  const onRecreate = useCallback((): void => {
    formActionCreators.createForm(dispatchForm, selectedSimulation.form);
    if (isOpen) onClose();
  }, [selectedSimulation, isOpen]);

  const onDelete = useCallback((): void => {
    simulationActionCreators.deleteSimulation(dispatchSimulation, selectedSimulation.id);
    if (isOpen) onClose();
    setDeleted(true);
  }, [selectedSimulation, isOpen]);

  const onCopy = useCallback((): void => {
    navigator.clipboard.writeText(window.location.toString());
  }, [navigator, window]);

  return (
    <>
      <Button
        onClick={onDelete}
        isDisabled={loading}
        variant="light"
        color="danger"
      >
        Delete
      </Button>
      <Button
        onClick={onCopy}
        variant="light"
      >
        Copy link
      </Button>
      <Button
        onClick={onRecreate}
        isDisabled={loading || selectedSimulation.form.advanced}
        href="/build"
        as={Link}
        variant="light"
      >
        Recreate
      </Button>
    </>
  );
}
