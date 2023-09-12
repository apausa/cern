import { Input } from '@nextui-org/react';
import React from 'react';
import {
  FormAction, NumberArg, UpdateBuildCmdValue, UpdateRunCmdValue,
} from '@/_private/types/lib/formTypes';

export default function NumberInput(
  {
    arg, formAction, dispatchForm,
  }:
  {
    arg: NumberArg,
    formAction: UpdateBuildCmdValue | UpdateRunCmdValue,
    dispatchForm: React.Dispatch<FormAction>
  },
) {
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
