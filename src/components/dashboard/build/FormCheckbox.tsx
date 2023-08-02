'use client';

import React, { SyntheticEvent } from 'react';

import { FormCheckboxAction, FormCheckboxProps } from '@/types/build';

export default function FormCheckbox({ arg, dispatch }: FormCheckboxProps) {
  const handleChange = (event: SyntheticEvent): void => {
    const action: FormCheckboxAction = { type: 'UPDATE_FORM_CHECKBOX', event };

    dispatch(action);
  };

  return (
    <div>
      <input
        type="checkbox"
        id={arg.name}
        name={arg.name}
        onChange={handleChange}
        value={arg.value}
        // Custom
        checked={arg.isChecked}
      />
      <label htmlFor={arg.name}>{arg.name}</label>
      <p>
        Selected value →
        {' '}
        {arg.value}
      </p>
    </div>
  );
}
