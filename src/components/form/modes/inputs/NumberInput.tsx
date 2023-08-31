import { Input } from '@nextui-org/react';
import React from 'react';

// Types
import { NumberInputProps } from '@/types/components/form';

// Actions
import formActionCreator from '@/lib/state/actions/form';

export default function NumberInput({ arg, dispatchForm }: NumberInputProps) {
  const handleValueChange = (value: string): void => {
    formActionCreator.updateFormCmdObjVal(dispatchForm, value, arg.name);
  };

  return (
    <Input
      type="number"
      aria-label="Number input"
      onValueChange={handleValueChange}
      value={arg.value}
    />
  );
}
