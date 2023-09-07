'use client';

import {
  Button,
  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure,
} from '@nextui-org/react';
import { usePathname, useRouter, notFound } from 'next/navigation';
import React, {
  useCallback, useEffect, useMemo, useReducer, useState,
} from 'react';
import Details from '@/(private)/_components/details/Details';
import simulationActionCreators from '@/(private)/_lib/actions/simulationActions';
import { Simulation, UseReducer } from '@/(private)/_types/components/simulationTypes';
import simulationReducer from '@/(private)/_lib/reducers/simulationReducer';

export default function SimulationModal({ params: { id } }: any) {
  const pathName: string = usePathname();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(true);
  const [simulations, dispatchSimulation]: UseReducer = useReducer(simulationReducer, []);
  const selectedSimulation: Simulation | undefined = useMemo(() => simulations.find(
    (simulation: Simulation): boolean => simulation.id === id,
  ), [simulations, id]);

  const handleClose = useCallback((): void => {
    router.push('/');
    onClose();
  }, [router]);

  const onRecreate = useCallback((): void => {}, []);
  const onDelete = useCallback((): void => {}, []); // @develop

  useEffect(() => {
    if (pathName.startsWith('/simulation')) {
      onOpen();
      simulationActionCreators.readAllSimulations(dispatchSimulation);
    }
  }, [pathName]);

  useEffect(() => {
    if (selectedSimulation) setLoading(false);
  }, [selectedSimulation]);

  if (!loading && !selectedSimulation) return notFound();

  return (
    <Modal
      isOpen={isOpen}
      size="xl"
      scrollBehavior="inside"
      onClose={handleClose}
      backdrop="opaque"
    >
      <ModalContent>
        <ModalHeader className="border-b border-b-neutral-800">
          <div className="pt-2">
            {selectedSimulation?.form.title}
            {' '}
            details
          </div>
        </ModalHeader>
        <ModalBody>
          {(loading)
            ? (<Spinner />)
            : (
              <Details
                selectedSimulation={selectedSimulation}
                dispatchSimulation={dispatchSimulation}
              />
            )}
        </ModalBody>
        <ModalFooter className="border-t border-t-neutral-800 flex justify-between">
          {(selectedSimulation === undefined)
            ? (<div />)
            : (
              <>
                <Button
                  onClick={onDelete}
                  variant="light"
                  color="danger"
                >
                  Delete
                </Button>
                <Button
                  onClick={onRecreate}
                >
                  Recreate
                </Button>
              </>
            )}

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
