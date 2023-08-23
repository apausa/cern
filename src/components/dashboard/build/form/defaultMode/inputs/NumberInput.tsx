import { Input } from '@nextui-org/react';
import React from 'react';

// Types
import { NumberInputProps } from '@/types/build';

export default function NumberInput({ arg, setCmdObjValues }: NumberInputProps) {
  const handleValueChange = (value: string): void => {
    setCmdObjValues(value, arg.name);
  };

  return (
    <Input
      type="number"
      aria-label="Number input"
      onValueChange={handleValueChange}
      value={arg.value}
      min={arg.input.min}
      max={arg.input.max}
    />
  );
}
