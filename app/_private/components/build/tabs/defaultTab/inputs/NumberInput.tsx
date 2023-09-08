import { Input } from '@nextui-org/react';
import React from 'react';

// Types
import { NumberInputProps } from '@/_private/types/components/formTypes';

export default function NumberInput({ arg, formAction, dispatchForm }: NumberInputProps) {
  const handleValueChange = (value: string): void => {
    formAction(dispatchForm, value, arg.name);
  };

  return (
    <Input
      type="number"
      aria-label="Number input"
      isDisabled={arg.disabled}
      value={`${arg.value}`}
      onValueChange={handleValueChange}
    />
  );
}
