'use client';

import React, { SyntheticEvent } from 'react';

export default function RadioInput({ arg, handleUpdateValueProperty }: any) {
  const handleChange = (event: SyntheticEvent): void => {
    handleUpdateValueProperty(event);
  };

  return arg.input.options.map((option: string) => (
    <label htmlFor={option} key={option}>
      <input
        type="radio"
        id={option}
        name={arg.name}
        onChange={handleChange}
        value={option}
        // Custom
        checked={arg.value === option}
        disabled={!arg.checked}
      />
      {option}
      <br />
    </label>
  ));
}
