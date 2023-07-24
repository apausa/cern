import React from 'react';

import { ActionNumber, PropsNumber } from '@/types/dashboard/build/inputNumberTypes';

export default function InputNumber({ arg, dispatch }: PropsNumber) {
  const handleChange = (event: any) => {
    const action: ActionNumber = { type: 'UPDATE_INPUT_NUMBER', event };

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
        min={arg.min}
        max={arg.max}
      />
    </div>
  );
}
