'use client';

import React from 'react';

// Types
import { InputOtherAction, InputNumberProps } from '@/types/dashboard/build';

export default function InputNumber({ arg, dispatch }: InputNumberProps) {
  const handleChange = (event: any) => {
    const action: InputOtherAction = { type: 'UPDATE_INPUT_OTHER', event };

    dispatch(action);
  };

  return (
    <div>
      <input
        type="number"
        name={arg.name}
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
