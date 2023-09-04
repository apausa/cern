import { Input } from '@nextui-org/react';
import React from 'react';

// Types
import { NumberInputProps } from '@/_types/components/formTypes';

// Actions
import formActionCreator from '@/_lib/actions/formActions';

export default function NumberInput({ arg, dispatchForm }: NumberInputProps) {
  const handleValueChange = (value: string): void => {
    // @develop
    formActionCreator.updateFormCmdObjVal(dispatchForm, value, arg.name);
  };

  return (
    <Input
      type="number"
      aria-label="Number input"
      size="sm"
      isDisabled={arg.disabled}
      value={`${arg.value}`}
      onValueChange={handleValueChange}
    />
  );
}
