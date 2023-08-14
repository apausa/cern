import { O2Cmd } from '@/types/build';

const parseO2Cmd = ({ name, args }: O2Cmd): string => (
  [name, ...args.reduce((acc: (string | number)[], val: any): (string | number)[] => (
    acc.concat(val.checked ? [val.name, val.value] : [])), [])]).join(' ');

export default parseO2Cmd;
