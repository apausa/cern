import { O2CmdObj } from '@/types/build';

const getO2CmdStr = ({ name, args }: O2CmdObj): string => (
  [name, ...args.reduce((acc: (string | number)[], val: any): (string | number)[] => (
    acc.concat(val.checked ? [val.name, val.value] : [])), [])]).join(' ');

export default getO2CmdStr;
