'use client';

import React, { SyntheticEvent } from 'react';

export default function FormNumber({ arg, handleUpdateNumberInput }: any) {
  const handleChange = (event: SyntheticEvent): void => {
    handleUpdateNumberInput(event);
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
        disabled={!arg.isChecked}
        min={arg.input.min}
        max={arg.input.max}
      />
    </label>
  );
}
