/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */

import { CmdObj } from '@/types/build';
import { Metadata } from '@/types/dashboard';

export const getSelectedKeys = (cmdObj: CmdObj): Set<string> => (
  new Set(cmdObj.args.map(({ selected, name }: any) => { if (selected) return name; })));

export const getDisabledKeys = (cmdObj: CmdObj): string[] => (
  cmdObj.args.map(({ disabled, name }: any) => { if (disabled) return name; }));

export const getSelectedKeyFromAllMetadata = (allMetadata: Metadata[]): any => {
  if (allMetadata.length !== 0) return new Set([allMetadata[0].id]);
};
