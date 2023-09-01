import { CmdArg } from '@/types/lib';

export const getSelectedKeys = (args: CmdArg[]): string[] => (
  args.filter(({ selected }: CmdArg) => selected).map(({ name }: CmdArg) => name));
