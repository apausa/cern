import {
  Input, Select, SelectItem, Selection,
} from '@nextui-org/react';
import React, { useMemo } from 'react';
import {
  FormAction, StringArg, UpdateBuildCmdValue, UpdateRunCmdValue,
} from '@/_private/types/lib/formTypes';

export default function SelectInput(
  {
    arg, formAction, dispatchForm,
  }:
  {
    arg: StringArg,
    formAction: UpdateBuildCmdValue | UpdateRunCmdValue,
    dispatchForm: React.Dispatch<FormAction>
  },
) {
  const selectedKeys = useMemo(() => new Set([arg.value]), [arg.value]);
  const handleOnSelectionChange = (keys: Selection): any => {
    formAction(dispatchForm, Array.from(keys)[0], arg.name);
  };

  return (
    arg.input.options ? (
      <Select
        onSelectionChange={handleOnSelectionChange}
        selectedKeys={selectedKeys}
        aria-label="Select value"
        labelPlacement="outside"
      >
        {arg.input.options.map((option: string) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </Select>
    ) : (
      <Input
        type="text"
        aria-label="Number input"
        id={`${arg.name} value`}
        isReadOnly
        isDisabled={arg.disabled}
        value={arg.value}
      />
    )
  );
}
