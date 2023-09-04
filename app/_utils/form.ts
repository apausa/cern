import { Arg } from '@/_types/components/formTypes';

export const getSelectedKeys = (args: Arg[]): string[] => (
  args.filter(({ selected }: Arg) => selected).map(({ name }: Arg) => name));
