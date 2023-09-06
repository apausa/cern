'use client';

import {
  Button,
  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, {
  useCallback, useEffect, useMemo, useReducer,
} from 'react';
import Details from '@/(private)/_components/details/Details';
import simulationActionCreators from '@/(private)/_lib/actions/simulationActions';
import { Simulation, UseReducer } from '@/(private)/_types/components/simulationTypes';
import simulationReducer from '@/(private)/_lib/reducers/simulationReducer';

export default function SimulationModal({ params: { id } }: any) {
  const router = useRouter();
  const [simulations, dispatchSimulation]: UseReducer = useReducer(simulationReducer, []);
  const selectedSimulation: Simulation | undefined = useMemo(() => simulations.find(
    (simulation: Simulation): boolean => simulation.id === id,
  ), [simulations, id]);

  const onClose = useCallback((): void => {
    router.push('/');
  }, [router]);

  const onClick = useCallback((): void => {
    if (selectedSimulation) {
      router.push(`/build/${selectedSimulation.id}`);
    }
  }, [selectedSimulation]);

  useEffect(() => {
    simulationActionCreators.readAllSimulations(dispatchSimulation);
  }, []);

  // @develop, diferentiate between loading and not found
  // @develop, form does not after beign closed for the first time
  // @develop, implement recreate functionality
  // @develop, implement delete functionality

  return (
    <Modal
      defaultOpen
      size="xl"
      scrollBehavior="inside"
      onClose={onClose}
      backdrop="opaque"
    >
      <ModalContent>
        <ModalHeader className="border-b border-b-neutral-800">
          <div className="pt-2">Job details</div>
        </ModalHeader>
        <ModalBody className="pt-4">
          {(selectedSimulation)
            ? (
              <Details
                selectedSimulation={selectedSimulation}
                dispatchSimulation={dispatchSimulation}
              />
            )
            : (<div>Not found</div>)}
        </ModalBody>
        <ModalFooter className="border-t border-t-neutral-800">
          {(selectedSimulation === undefined)
            ? (<div />)
            : (
              <Button
                onClick={onClick}
                isDisabled={!selectedSimulation}
              >
                Recreate
              </Button>
            )}

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
