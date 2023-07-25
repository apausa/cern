'use client';

import React from 'react';

// Types
import { InputRadioAction, InputRadioProps } from '@/types/dashboard/build/o2Fieldset/inputRadio';

export default function InputRadio({ arg, dispatch }: InputRadioProps) {
  const handleChange = (event: any) => {
    const action: InputRadioAction = { type: 'UPDATE_INPUT_RADIO', event };

    dispatch(action);
  };

  return (
    <>
      {arg.input.options.map((option) => (
        <div>
          <label htmlFor={option}>{option}</label>
          <input
            type="radio"
            id={option}
            name={option}
            onChange={handleChange}
            value={option}
            // Custom
            checked={option === arg.value}
            disabled={!arg.isChecked}
          />
        </div>
      ))}
    </>
  );
}
