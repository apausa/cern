'use client';

import React from 'react';

// Types
import { InputNumberAction, InputNumberProps } from '@/types/dashboard/build/o2Fieldset/inputNumber';

export default function InputNumber({ arg, dispatch }: InputNumberProps) {
  const handleChange = (event: any) => {
    const action: InputNumberAction = { type: 'UPDATE_INPUT_NUMBER', event };

    dispatch(action);
  };

  return (
    <div>
      <label htmlFor={arg!.title}>{arg!.title}</label>
      <input
        type="number"
        id={arg.title}
        name={arg.title}
        onChange={handleChange}
        value={arg.value}
        // Custom
        disabled={!arg.isChecked}
        min={arg.input.min}
        max={arg.input.max}
      />
    </div>
  );
}
