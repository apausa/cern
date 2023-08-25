import { ChildProcess, spawn } from 'child_process';

// Constants
import { GRID_VERSION_CMD, GRID_EXEC_CMD } from '@/lib/constants/api';

// Utils
import { setGridStatus } from '@/utils/setStatus';
import { getSelectedVersion } from '@/utils/getDate';

// Types
import { Metadata } from '@/types/lib';
import { GridVersionCmd } from '@/types/app/api';

const runScriptInGrid = async (metadata: Metadata): Promise<Metadata> => {
  const { name, args }: GridVersionCmd = GRID_VERSION_CMD(
    getSelectedVersion(metadata.form.selectedDate),
  );
  const childProcess: ChildProcess = spawn(name, args);

  childProcess.stdin?.write(GRID_EXEC_CMD(metadata.gridScript.scriptPath));
  childProcess.stdin?.end('exit');

  childProcess.stderr?.on('data', (output: any) => { console.log(output.toString()); }); // @develop

  return new Promise((resolve): void => {
    childProcess.on('close', (output: number) => {
      resolve(setGridStatus(metadata, (output === 0) ? 'FULFILLED' : 'REJECTED'));
    });
    childProcess.on('error', () => { resolve(setGridStatus(metadata, 'REJECTED')); });
  });
};

export default runScriptInGrid;
