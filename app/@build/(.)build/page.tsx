'use client';

import {
  Button,
  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
} from '@nextui-org/react';
import React, { useCallback, useReducer } from 'react';

// Components
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Form from '@/_components/build/Form';

// Constants
import INITIAL_FORM from '@/_lib/constants/formConstants';

// Types
import { FormUseReducer } from '@/_types/components/formTypes';

// Reducer
import formReducer from '@/_lib/reducers/formReducer';
import { UseReducer } from '@/_types/components/simulationTypes';
import simulationReducer from '@/_lib/reducers/simulationReducer';
import formActionCreators from '@/_lib/actions/formActions';
import simulationActionCreators from '@/_lib/actions/simulationActions';

export default function BuildModal() {
  const [form, dispatchForm]: FormUseReducer = useReducer(formReducer, INITIAL_FORM);
  const [, dispatchSimulation]: UseReducer = useReducer(simulationReducer, []);
  const router = useRouter();

  const onStage = (): void => {
    formActionCreators.createForm(dispatchForm, INITIAL_FORM);
    simulationActionCreators.createSimulation(dispatchSimulation, form);
  };

  const onReset = (): void => {
    formActionCreators.createForm(dispatchForm, INITIAL_FORM);
  };

  const onClose = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Modal
      defaultOpen
      size="xl"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="border-b border-b-neutral-800">
          <div className="py-1">Job configuration</div>
        </ModalHeader>
        <ModalBody className="pt-4">
          <Form form={form} dispatchForm={dispatchForm} />
        </ModalBody>
        <ModalFooter className="border-t border-t-neutral-800 flex justify-between">
          <Button
            onClick={onReset}
            variant="light"
          >
            Reset
          </Button>
          <Button
            href="/"
            as={Link}
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
