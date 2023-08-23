import React from 'react';
import { Input } from '@nextui-org/react';

// Utils
import { getCurrentDate } from '@/utils/getDate';

// Types
import { SelectVersionProps } from '@/types/build';

export default function SelectVersion({ selectedDate, setSelectedDate }: SelectVersionProps) {
  return (
    <Input
      className="p-4"
      label="Select version"
      type="date"
      min="2021-09-22"
      max={getCurrentDate()}
      value={selectedDate}
      onValueChange={setSelectedDate}
    />
  );
}
