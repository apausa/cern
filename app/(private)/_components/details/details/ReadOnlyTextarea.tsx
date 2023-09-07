import React from 'react';
import { Textarea } from '@nextui-org/react';

// Types
import { ReadOnlyTextArea } from '@/(private)/_types/components/simulationTypes';

export default function ReadOnlyTextarea({
  label, value, color, variant,
}: ReadOnlyTextArea) {
  return (
    <Textarea
      className="pb-2"
      isReadOnly
      variant={variant}
      color={color}
      label={label}
      value={value}
    />
  );
}
