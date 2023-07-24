import React from 'react';

import { ActionCheckbox, PropsCheckbox } from '@/types/dashboard/build/inputCheckboxTypes';

export default function InputCheckbox({ arg, dispatch }: PropsCheckbox) {
  const handleChange = (event: any) => {
    const action: ActionCheckbox = { type: 'UPDATE_INPUT_CHECKBOX', event };

    dispatch(action);
  };

  return (
    <div>
      <label htmlFor={arg!.title}>{arg!.title}</label>
      <input
        type="checkbox"
        id={arg!.title}
        name={arg!.title}
        checked={arg!.isChecked}
        onChange={handleChange}
      />
    </div>
  );
}
