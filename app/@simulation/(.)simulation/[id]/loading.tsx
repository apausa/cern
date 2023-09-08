'use client';

import {
  Modal,
  ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure,
} from '@nextui-org/react';
import React, { useEffect } from 'react';

export default function Loading() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
    return () => { onClose(); };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      size="xl"
      isDismissable={false}
      scrollBehavior="inside"
      backdrop="opaque"
    >
      <ModalContent>
        <ModalHeader />
        <ModalBody>
          <Spinner />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
