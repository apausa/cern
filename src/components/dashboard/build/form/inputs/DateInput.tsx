'use client';

import React from 'react';
import { Input } from '@nextui-org/react';

// Utils
import { getParsedCurrentDate } from '@/utils/getDate';

export default function SelectVersion({ date, setDate }: any) {
  return (
    <Input
      className="p-4"
      label="Select version"
      type="date"
      min="2021-09-22"
      max={getParsedCurrentDate()}
      value={date}
      onValueChange={setDate}
    />
  );
}
