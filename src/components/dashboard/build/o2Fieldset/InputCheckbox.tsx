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
      <br />
      <input
        type="checkbox"
        id={arg.title}
        name={arg.title}
        onChange={handleChange}
        value={arg.value}
        // Custom
        checked={arg.isChecked}
      />
      <label htmlFor={arg.title}>{arg.title}</label>
      <p>
        Value →
        {' '}
        {arg.value}
      </p>
    </div>
  );
}
