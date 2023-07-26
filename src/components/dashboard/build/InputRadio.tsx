'use client';

import React from 'react';

// Types
import { InputOtherAction, InputRadioProps } from '@/types/dashboard/build';

export default function InputRadio({ arg, dispatch }: InputRadioProps) {
  const handleChange = (event: any) => {
    const action: InputOtherAction = { type: 'UPDATE_INPUT_OTHER', event };

    dispatch(action);
  };

  return (
    <>
      {arg.input.options.map((option) => (
        <div key={option}>
          <input
            type="radio"
            id={option}
            name={arg.name}
            onChange={handleChange}
            value={option}
            // Custom
            checked={option === arg.value}
            disabled={!arg.isChecked}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </>
  );
}
