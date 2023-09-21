import { Input } from '@nextui-org/react';
import React from 'react';

// Types
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
  const onValueChange = (value: string): void => {
    formAction(dispatchForm, value, arg.name);
  };

  return (
    <Input
      type="number"
      aria-label="Number input"
      min="0"
      placeholder={arg.description}
      isDisabled={arg.disabled}
      value={arg.value}
      onValueChange={onValueChange}
    />
  );
}
