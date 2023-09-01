/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input, Select, SelectItem } from '@nextui-org/react';
import React, { useState } from 'react';

// Types
import { StringInputProps } from '@/types/components/form';

// Actions
import formActionCreator from '@/lib/state/actions/form';

export default function SelectInput({ arg, dispatchForm }: StringInputProps) {
  // const [selectedKey, setSelectedKey] = useState(new Set([arg.value]));

  // const handleOnSelectionChange = (key: any): void => {
  //   formActionCreator.updateFormCmdObjVal(dispatchForm, key, arg.name);
  //   setSelectedKey(key);
  // };

  return (
    // <Select
    //   onSelectionChange={handleOnSelectionChange}
    //   selectedKeys={selectedKey}
    //   aria-label="Select input"
    // >
    //   {arg.input.options.map((option: string) => (
    //     <SelectItem key={option} value={option}>{option}</SelectItem>
    //   ))}
    // </Select>
    <Input
      type="text"
      aria-label="Number input"
      size="sm"
      id={`${arg.name} value`}
      isReadOnly
      isDisabled={arg.disabled}
      variant="bordered"
      value={arg.value}
    />
  );
}
