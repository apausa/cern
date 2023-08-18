/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */

import { O2CmdObj } from '@/types/build';

export const getSelectedKeys = (o2CmdObj: O2CmdObj): Set<string> => (
  new Set(o2CmdObj.args.map(({ selected, name }: any) => { if (selected) return name; })));

export const getDisabledKeys = (o2CmdObj: O2CmdObj): string[] => (
  o2CmdObj.args.map(({ disabled, name }: any) => { if (disabled) return name; }));
