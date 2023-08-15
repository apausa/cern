import * as fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

// Types
import { Simulation } from '@/types/dashboard';

// Utils
import getPath from '@/utils/getPath';
import { getO2Cmd } from '@/utils/getCmd';

const buildScript = async (bashScript: BashScript): Promise<Simulation> => {
  const id: string = uuidv4();
  const filePath: string = getPath(id);

  // @develop

  await fs.writeFile(filePath, undefined);
  await fs.chmod(filePath, '755');

  return {
    bashScript,
    id,
    date: new Date(),
    testStatus: null,
    prodStatus: null,
  };
};

export default buildScript;
