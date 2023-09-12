'use client';

import {
  Button,
  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure,
} from '@nextui-org/react';
import React, {
  useCallback, useReducer, useEffect, useState,
} from 'react';
import { notFound, usePathname, useRouter } from 'next/navigation';

// Components
import BuildForm from '@/_private/components/build/BuildForm';

// Constants
import INITIAL_FORM from '@/_private/lib/constants/formConstants';

// Reducers
import formReducer from '@/_private/lib/reducers/formReducer';
import simulationReducer from '@/_private/lib/reducers/simulationReducer';

// Actions
import formActionCreators from '@/_private/lib/actions/formActions';
import simulationActionCreators from '@/_private/lib/actions/simulationActions';

export default function BuildModal() {
  const pathName = usePathname();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [, dispatchSimulation] = useReducer(simulationReducer, []);
  const [form, dispatchForm] = useReducer(formReducer, null);

  const handleClose = useCallback((): void => {
    onClose();
    router.push('/');
  }, [router]);

  const onStage = useCallback(async (): Promise<void> => {
    await simulationActionCreators.createSimulation(dispatchSimulation, form);
    formActionCreators.createForm(dispatchForm, INITIAL_FORM);
    handleClose();
  }, [form]);

  const onReset = useCallback((): void => {
    formActionCreators.createForm(dispatchForm, INITIAL_FORM);
  }, []);

  useEffect(() => {
    if (pathName === '/build') {
      simulationActionCreators.readAllSimulations(dispatchSimulation);
      formActionCreators.readForm(dispatchForm);
      onOpen();
    }
  }, [pathName]);

  useEffect(() => {
    if (form) setLoading(false);
  }, [form]);

  if (!loading && !form) return notFound();

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
          <div className="pt-2">Job configuration</div>
        </ModalHeader>
        <ModalBody className="gap-0">
          {loading ? <Spinner /> : <BuildForm form={form} dispatchForm={dispatchForm} />}
        </ModalBody>
        <ModalFooter className="border-t border-t-neutral-800 flex justify-between">
          <Button
            onClick={onReset}
            isDisabled={loading}
          >
            Reset
          </Button>
          <Button
            color="primary"
            onClick={onStage}
            isDisabled={loading}
          >
            Stage
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
