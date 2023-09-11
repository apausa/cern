import {
  Input, Select, SelectItem, Selection,
} from '@nextui-org/react';
import React, { useMemo } from 'react';

// Types
import { StringInputProps } from '@/_private/types/components/formTypes';

export default function SelectInput({ arg, formAction, dispatchForm }: StringInputProps) {
  const selectedKeys = useMemo(() => new Set([arg.value]), [arg.value]);
  const handleOnSelectionChange = (keys: Selection): any => {
    formAction(dispatchForm, Array.from(keys)[0], arg.name);
  };

  // @develop, implement custom inputs

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
