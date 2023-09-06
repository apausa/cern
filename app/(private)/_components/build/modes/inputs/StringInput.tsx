import {
  Input, Select, SelectItem, Selection,
} from '@nextui-org/react';
import React, { useMemo } from 'react';

// Types
import { StringInputProps } from '@/(private)/_types/components/formTypes';

// Actions
import formActionCreator from '@/(private)/_lib/actions/formActions';

export default function SelectInput({ arg, dispatchForm }: StringInputProps) {
  const selectedKeys = useMemo(() => new Set([arg.value]), [arg.value]);
  const handleOnSelectionChange = (keys: Selection): any => {
    // @develop, update values
    formActionCreator.updateFormCmdObjVal(dispatchForm, Array.from(keys)[0], arg.name);
  };

  // @develop, make it work

  return (
    arg.input.options ? (
      <Select
        onSelectionChange={handleOnSelectionChange}
        selectedKeys={selectedKeys}
        aria-label="Select value"
        labelPlacement="outside"
        size="sm" // Ignore problem
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
        size="sm"
        id={`${arg.name} value`}
        isReadOnly
        isDisabled={arg.disabled}
        value={arg.value}
      />
    )
  );
}
