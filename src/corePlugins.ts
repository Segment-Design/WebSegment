/*
 * Web Segmnts by Segment Design
 * @author @Stuffincode - Riaz Ahamed <https://www.riazahamed.io>
 * */

/*
 * Core Plugins:
 * - 
 * */
import path from 'path';
import fs from 'fs';
import postcss from 'postcss';

import { version as webSegmentVersion } from "../package.json";

const pluginName = 'websegment';
const lisenceType = 'MIT Lisence';
const website = 'https://www.segmentdesign.com';

interface corePluginsOptions {
  addBase: any;
}

export const corePlugins = {
  preflight: ({ addBase }: corePluginsOptions): void => preflightPlugin({ addBase: addBase?.() })
}

const preflightPlugin = ({ addBase }: corePluginsOptions) => {
  
    const preflightStyles = postcss.parse(
      fs.readFileSync(path.join(__dirname, './css/preflight.css'), 'utf8'),
    );

    addBase([
      postcss.comment({
        text: `© ${pluginName} v${webSegmentVersion} | ${lisenceType} | ${website}`,
      }),
      ...preflightStyles.nodes,
    ]);
}

