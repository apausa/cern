'use client';

import React, { SyntheticEvent } from 'react';

export default function FormRadio({ arg, handleUpdateRadioInput }: any) {
  const handleChange = (event: SyntheticEvent): void => {
    handleUpdateRadioInput(event);
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
        checked={arg.value === 'TGeant4'}
        disabled={!arg.isChecked}
      />
      {option}
    </label>
  ));
}
