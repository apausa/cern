'use client';

import React from 'react';

// Types
import { EvalFieldsetProps } from '@/types/dashboard/build';

export default function EvalFieldset({ command }: EvalFieldsetProps) {
  return (
    <fieldset>
      <legend>{command.description}</legend>
      <div>{command.title}</div>
    </fieldset>
  );
}
