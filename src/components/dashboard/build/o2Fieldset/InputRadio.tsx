'use client';

import React from 'react';

// Types
import { InputRadioAction, InputRadioProps } from '@/types/dashboard/build';

export default function InputRadio({ arg, dispatch }: InputRadioProps) {
  const handleChange = (event: any) => {
    const action: InputRadioAction = { type: 'UPDATE_INPUT_RADIO', event };

    dispatch(action);
  };

  return (
    <>
      {arg.input.options.map((option) => (
        <div key={option}>
          <input
            type={arg.type}
            id={option}
            name={arg.title}
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
