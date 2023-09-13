import {
  Input,
} from '@nextui-org/react';
import React from 'react';

// Types
import {
  FormAction, StringArg, UpdateBuildCmdValue, UpdateRunCmdValue,
} from '@/_private/types/lib/formTypes';

export default function StringInput(
  {
    arg, formAction, dispatchForm,
  }:
  {
    arg: StringArg,
    formAction: UpdateBuildCmdValue | UpdateRunCmdValue,
    dispatchForm: React.Dispatch<FormAction>
  },
) {
  const onValueChange = (value: string): void => {
    formAction(dispatchForm, value, arg.name);
  };

  return (
    <Input
      type="text"
      aria-label="Text input"
      isDisabled={arg.disabled}
      value={arg.value}
      onValueChange={onValueChange}
    />
  );
}
