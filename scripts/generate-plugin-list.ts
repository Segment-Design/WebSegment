import fs from 'fs';
import path from 'path';
import { corePlugins } from '../segment/corePlugins';

const corePluginList = Object.keys(corePlugins);
console.log(corePluginList, `export default ${JSON.stringify(corePluginList)}`);
fs.writeFileSync(
  path.join(process.cwd(), 'src', 'corePluginList.js'),  `export default ${JSON.stringify(corePluginList)}`
);
