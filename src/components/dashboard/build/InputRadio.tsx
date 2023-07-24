/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { ActionRadio, PropsRadio } from '@/types/dashboard/build/inputRadioTypes';

export default function InputRadio({ arg, dispatch }: PropsRadio) {
  const handleChange = (event: any) => {
    const action: ActionRadio = { type: 'UPDATE_INPUT_RADIO', event };

    dispatch(action);
  };
  return (
    <div>
      @develop
    </div>
  );
}
