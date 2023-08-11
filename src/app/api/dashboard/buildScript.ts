import * as fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

// Types
import { BashScript } from '@/types/build';
import { Simulation } from '@/types/dashboard';

// Utils
import returnPath from '@/utils/returnPath';
import { parseScript } from '@/utils/parsers';

const buildScript = async (bashScript: BashScript): Promise<Simulation> => {
  const id: string = uuidv4();
  const filePath: string = returnPath(id);

  await fs.writeFile(filePath, parseScript(bashScript).join(' '));
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
