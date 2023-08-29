/* eslint-disable no-control-regex */

import { ChildProcess, spawn } from 'child_process';

// Constants
import { GRID_VERSION_CMD, GRID_EXEC_CMD } from '@/lib/state/constants/api';

// Utils
import { getSelectedVersion } from '@/utils/getDate';

// Types
import { Metadata, Outputs } from '@/types/lib';
import { GridVersionCmd } from '@/types/app/api';

const GRID_DIRECTORY_REGEXP: RegExp = /Your job's working directory will be (.+)/;
const LOCAL_DIRECTORY_REGEXP: RegExp = /Local working directory is (.+)/;
const GRID_URL_REGEXP: RegExp = /OK, display progress on (.+)/;
const GRID_ID_REGEXP: RegExp = /Preparing job "(.+)"/;

const runScriptInGrid = async (metadata: Metadata): Promise<Metadata> => {
  const { name, args }: GridVersionCmd = GRID_VERSION_CMD(
    getSelectedVersion(metadata.form.selectedDate),
  );
  const childProcess: ChildProcess = spawn(name, args);
  const outputs: Outputs = {
    gridDirectory: null,
    localDirectory: null,
    gridUrl: null,
    gridId: null,
  };

  childProcess.stdin?.write(GRID_EXEC_CMD(metadata.gridScript.scriptPath));
  childProcess.stdin?.end('exit');

  childProcess.stderr?.on('data', (output: any) => {
    const [, gridDirectoryMatch]: string[] = output.toString().match(GRID_DIRECTORY_REGEXP) || [];
    const [, localDirectoryMatch]: string[] = output.toString().match(LOCAL_DIRECTORY_REGEXP) || [];
    const [, gridUrlMatch]: string[] = output.toString().match(GRID_URL_REGEXP) || [];
    const [, gridIdMatch]: string[] = output.toString().match(GRID_ID_REGEXP) || [];

    if (gridDirectoryMatch !== undefined) outputs.gridDirectory = gridDirectoryMatch.replace(/\x1B\[.*?m/g, '');
    if (localDirectoryMatch !== undefined) outputs.localDirectory = localDirectoryMatch.replace(/\x1B\[.*?m/g, '');
    if (gridUrlMatch !== undefined) outputs.gridUrl = gridUrlMatch.replace(/\x1B\[.*?m/g, '');
    if (gridIdMatch !== undefined) outputs.gridId = gridIdMatch.replace(/\x1B\[.*?m/g, '');
  });

  return new Promise((resolve, reject): void => {
    childProcess.on('close', (output: number) => {
      if (output === 0) {
        resolve({
          ...metadata,
          gridScript: {
            ...metadata.gridScript,
            scriptStatus: 'FULFILLED',
            outputs,
          },
        });
      }
      if (output !== 0) reject(new Error(`grid_submit.sh returned ${output}`));
    });
    childProcess.on('error', (error: Error): void => { reject(error); });
  });
};

export default runScriptInGrid;
