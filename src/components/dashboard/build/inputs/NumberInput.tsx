'use client';

import React, { SyntheticEvent } from 'react';

export default function NumberInput({ arg, handleUpdateValueProperty }: any) {
  const handleChange = (event: SyntheticEvent): void => {
    handleUpdateValueProperty(event);
  };

  return (
    <label htmlFor={arg.name}>
      <input
        type="number"
        id={arg.name}
        name={arg.name}
        onChange={handleChange}
        value={arg.value}
        // Custom
        disabled={!arg.checked}
        min={arg.input.min}
        max={arg.input.max}
      />
    </label>
  );
}
