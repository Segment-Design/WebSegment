import fs from 'fs';
import path from 'path';
import { corePlugins } from '../$segment/corePlugins';

const corePluinList = Object.keys(corePlugins);

fs.writeFileSync(
  path.join(process.cwd(), '$segment', 'corePluinList.js'), `export default ${corePluinList}`
);
