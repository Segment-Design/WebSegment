import fs from 'fs';
import path from 'path';
import { corePlugins } from '../src/corePlugins';

const corePluinList = Object.keys(corePlugins);

fs.writeFileSync(
  path.join(process.cwd(), 'src'), `export default ${corePluinList}`
);
