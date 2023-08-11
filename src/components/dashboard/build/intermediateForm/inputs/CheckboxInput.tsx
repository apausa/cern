'use client';

import React, { SyntheticEvent } from 'react';

export default function FormCheckbox({ arg, handleUpdateCheckboxInput }: any) {
  const handleChange = (event: SyntheticEvent): void => {
    handleUpdateCheckboxInput(event);
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
        checked={arg.isChecked}
      />
      {arg.name}
      {' '}
      →
      {' '}
      {arg.value}
    </label>
  );
}
