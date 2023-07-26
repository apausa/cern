'use client';

import React from 'react';

// Types
import { InputCheckboxAction, InputCheckboxProps } from '@/types/dashboard/build';

export default function InputCheckbox({ arg, dispatch }: InputCheckboxProps) {
  const handleChange = (event: any) => {
    const action: InputCheckboxAction = { type: 'UPDATE_INPUT_CHECKBOX', event };

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
