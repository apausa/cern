'use client';

import {
  Button,
  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure,
} from '@nextui-org/react';
import React, {
  useCallback, useReducer, useEffect,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Components
import Form from '@/(private)/_components/build/Form';

// Constants
import INITIAL_FORM from '@/(private)/_lib/constants/formConstants';
import { UseReducer } from '@/(private)/_types/components/simulationTypes';

// Types
import { FormUseReducer } from '@/(private)/_types/components/formTypes';

// Reducers
import formReducer from '@/(private)/_lib/reducers/formReducer';
import simulationReducer from '@/(private)/_lib/reducers/simulationReducer';

// Actions
import formActionCreators from '@/(private)/_lib/actions/formActions';
import simulationActionCreators from '@/(private)/_lib/actions/simulationActions';

export default function BuildModal() {
  const pathName: string = usePathname();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [, dispatchSimulation]: UseReducer = useReducer(simulationReducer, []);
  const [form, dispatchForm]: FormUseReducer = useReducer(formReducer, INITIAL_FORM);

  const handleClose = useCallback((): void => {
    router.push('/');
    onClose();
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
      onOpen();
    }
  }, [pathName]);

  // @develop, save form in local storage
  // @develop, implement loading component

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
        <ModalBody>
          <Form form={form} dispatchForm={dispatchForm} />
        </ModalBody>
        <ModalFooter className="mt-2 border-t border-t-neutral-800 flex justify-between">
          <Button
            onClick={onReset}
          >
            Reset
          </Button>
          <Button
            color="primary"
            onClick={onStage}
          >
            Stage
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
