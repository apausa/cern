'use client';

import {
  Button, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure,
} from '@nextui-org/react';
import { usePathname, useRouter, notFound } from 'next/navigation';
import React, {
  useCallback, useEffect, useMemo, useReducer, useState,
} from 'react';

// Components
import SimulationDetails from '@/_private/components/simulation/SimulationDetails';

// Types
import { Simulation } from '@/_private/types/components/simulationTypes';

// Actions
import simulationActionCreators from '@/_private/lib/actions/simulationActions';
import formActionCreators from '@/_private/lib/actions/formActions';

// Reducers
import simulationReducer from '@/_private/lib/reducers/simulationReducer';
import formReducer from '@/_private/lib/reducers/formReducer';

export default function SimulationModal({ params: { id } }: any) {
  const pathName = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [simulations, dispatchSimulation] = useReducer(simulationReducer, []);
  const [, dispatchForm] = useReducer(formReducer, null);
  const { isOpen, onOpen, onClose }: any = useDisclosure();

  const handleClose = useCallback((): void => {
    onClose();
    router.push('/');
  }, [router]);

  const selectedSimulation = useMemo((): Simulation | undefined => (
    simulations.find((simulation: Simulation): boolean => simulation.id === id)
  ), [simulations, id]);

  const onRecreate = useCallback((): void => {
    formActionCreators.createForm(dispatchForm, selectedSimulation!.form);
    onClose();
  }, [selectedSimulation]);

  const onDelete = useCallback((): void => {}, []);

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
            &apos;
            {selectedSimulation?.form.title}
            &apos;
            {' '}
            details
          </div>
        </ModalHeader>
        <ModalBody className="pb-0 gap-0">
          {(loading)
            ? (<Spinner />)
            : (
              <SimulationDetails
                selectedSimulation={selectedSimulation}
                dispatchSimulation={dispatchSimulation}
              />
            )}
        </ModalBody>
        <ModalFooter className="border-t border-t-neutral-800 flex justify-between">
          <Button
            onClick={onDelete}
            variant="light"
            color="danger"
            isDisabled={loading}
          >
            Delete
          </Button>
          <Button
            onClick={onRecreate}
            isDisabled={loading}
            href="/build"
            as={Link}
          >
            Recreate
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
