'use client';

import React, { SyntheticEvent } from 'react';

// Types
import { CheckboxInputProps } from '@/types/build';

export default function CheckboxInput({ arg, handleUpdateCheckedProperty }: CheckboxInputProps) {
  const handleChange = (event: SyntheticEvent): void => {
    handleUpdateCheckedProperty(event);
  };

  return (
    <label htmlFor={`${arg.name} checkbox`}>
      <input
        type="checkbox"
        id={`${arg.name} checkbox`}
        name={arg.name}
        onChange={handleChange}
        value={arg.value}
        // Custom
        checked={arg.checked}
      />

      {arg.name}
    </label>
  );
}
