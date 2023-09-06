import React from 'react';
import { Input } from '@nextui-org/react';

// Types
import { ReadOnlyInputProps } from '@/(private)/_types/components/simulationTypes';

export default function ReadOnlyInput({
  label, value, color, variant,
}: ReadOnlyInputProps) {
  return (
    <Input
      className="py-2"
      type="text"
      color={color}
      label={label}
      variant={variant}
      isReadOnly
      value={value}
    />
  );
}
