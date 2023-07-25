'use client';

import React from 'react';

// Types
import { InputNumberAction, InputNumberProps } from '@/types/dashboard/build';

export default function InputNumber({ arg, dispatch }: InputNumberProps) {
  const handleChange = (event: any) => {
    const action: InputNumberAction = { type: 'UPDATE_INPUT_NUMBER', event };

    dispatch(action);
  };

  return (
    <div>
      <input
        type="number"
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
