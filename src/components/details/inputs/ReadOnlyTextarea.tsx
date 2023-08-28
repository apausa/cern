import React from 'react';
import { Textarea } from '@nextui-org/react';

export default function ReadOnlyTextarea({
  label, value, color, variant,
}: any) {
  return (
    <Textarea
      className="py-2"
      isReadOnly
      variant={variant}
      color={color}
      label={label}
      value={value}
    />
  );
}
