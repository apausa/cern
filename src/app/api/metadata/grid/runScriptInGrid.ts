/* eslint-disable no-control-regex */

import { ChildProcess, spawn } from 'child_process';

// Constants
import { getGridExecCmd } from '@/lib/state/constants/api';

// Types
import { Metadata, Outputs } from '@/types/lib';
import { GridExecCmd } from '@/types/app/api';

const GRID_DIRECTORY_REGEXP: RegExp = /Your job's working directory will be (.+)/;
const LOCAL_DIRECTORY_REGEXP: RegExp = /Local working directory is (.+)/;
const GRID_URL_REGEXP: RegExp = /OK, display progress on (.+)/;
const GRID_ID_REGEXP: RegExp = /Preparing job "(.+)"/;

const runScriptInGrid = async (metadata: Metadata): Promise<Metadata> => {
  const { name, args }: GridExecCmd = getGridExecCmd(metadata.gridScript.scriptPath);
  const childProcess: ChildProcess = spawn(name, args);
  const fulfilledOutput: Outputs = {
    gridDirectory: null,
    localDirectory: null,
    gridUrl: null,
    gridId: null,
  };

  childProcess.stderr?.on('data', (output: any) => {
    const [, gridDirectoryMatch]: string[] = output.toString().match(GRID_DIRECTORY_REGEXP) || [];
    const [, localDirectoryMatch]: string[] = output.toString().match(LOCAL_DIRECTORY_REGEXP) || [];
    const [, gridUrlMatch]: string[] = output.toString().match(GRID_URL_REGEXP) || [];
    const [, gridIdMatch]: string[] = output.toString().match(GRID_ID_REGEXP) || [];

    if (gridDirectoryMatch !== undefined) fulfilledOutput.gridDirectory = gridDirectoryMatch.replace(/\x1B\[.*?m/g, '');
    if (localDirectoryMatch !== undefined) fulfilledOutput.localDirectory = localDirectoryMatch.replace(/\x1B\[.*?m/g, '');
    if (gridUrlMatch !== undefined) fulfilledOutput.gridUrl = gridUrlMatch.replace(/\x1B\[.*?m/g, '');
    if (gridIdMatch !== undefined) fulfilledOutput.gridId = gridIdMatch.replace(/\x1B\[.*?m/g, '');
  });

  return new Promise((resolve, reject): void => {
    childProcess.on('close', (code: number) => {
      resolve({
        ...metadata,
        gridScript: {
          ...metadata.gridScript,
          scriptStatus: (code === 0) ? 'FULFILLED' : 'REJECTED',
          fulfilledOutput,
          rejectedOutput: (code === 0) ? null : new Error(`grid_submit.sh returned code ${code}`).message,
        },
      });
    });
    childProcess.on('error', (error: Error): void => { reject(error); });
  });
};

export default runScriptInGrid;
