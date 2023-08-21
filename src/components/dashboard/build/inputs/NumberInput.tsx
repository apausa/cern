import { Input } from '@nextui-org/react';
import React from 'react';

// @continue
export default function NumberInput({ arg, setCmdObjValues }: any) {
  const handleValueChange = (value: string) => {
    setCmdObjValues(value, arg.name);
  };

  return (
    <Input
      type="number"
      onValueChange={handleValueChange}
      value={arg.value}
      min={arg.input.min}
      max={arg.input.max}
    />
  );
}
