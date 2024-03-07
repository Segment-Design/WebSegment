/*
 * Web Segmnts by Segment Design
 * @author @Stuffincode - Riaz Ahamed <https://www.riazahamed.io>
 */
import path, { normalize } from 'path';
import fs from 'fs';
import postcss from 'postcss';

import { version as webSegmentVersion } from "../package.json";

const pluginName = 'WebSegment';
const licenceType = 'MIT LICENCE';
const website = 'https://www.segmentdesign.com';

/**
 * Core Plugin options
 * @function addBase - Function for adding Metadata into file header and includes Style nodes
 */
interface corePluginsOptions {
  addBase: Function;
}
/**
 * Object container for core plugins, providing essential utilities and functionalities.
 * @object {corePlugins} corePlugins
 */
export const corePlugins = {
  /**
   * @param {function?} preflight - An optional function to add base styles. If not provided, no base styles will be added.
   */
  preflight: ({ addBase }: corePluginsOptions): void => preflightPlugin({ addBase: addBase?.() }),
  container: ((): any | undefined => {
    
    function extractMinWidths(breakpoints: any[] = []): number[] { // Assuming appropriate types
      return breakpoints
        .flatMap(breakpoints => breakpoints.values.map((value: any) => value.min))
        .filter((min) => min !== undefined);
    }
    
    function mapMinWidthsToPadding(minWidths?: any, screens?: any, paddings?:any | undefined): {
      minWidth: any,
      padding: any,
      screen?: any 
    }[] | undefined {
      if (typeof paddings === 'undefined') return[];
      if (!(typeof paddings === 'object' && paddings !== null)) return[{
        screen: 'DEFAULT',
        padding: paddings,
        minWidth: 0,
      }];
      if (paddings.DEFAULT) {
        return[{
          screen: 'DEFAULT',
          padding: paddings.DEFAULT,
          minWidth: 0,
        }];
      }
      const mapping: {minWidth: number, padding: number}[] = [];
      for (let minWidth of minWidths) {
        for (let screen of screens) {
          for (let { min }  of screen.values) {
            if (min === minWidth) {
              mapping.push({ minWidth, padding: paddings[screen.name] });
            }
          }
        }
      }

      return mapping;
    }
    
    return function({ addComponents, theme }): void {
      const screens = normalizeScreens(
        theme('container.screens', theme('screens')),
      );
      const minWidths = extractMinWidths(screens);
      const paddings = mapMinWidthsToPadding(minWidths, screens, theme('container.padding'));

    }

  })(),

  accessibility: ({ addUtilities }) => {
    addUtilities({
      ".sr-only": {
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        borderWidth: "0",
      },
      ".not-sr-only": {
        position: "static",
        width: "auto",
        height: "auto",
        padding: "0",
        margin: "0",
        overflow: "visible",
        clip: "auto",
        whiteSpace: "normal",
      },
    });
  },
}

const preflightPlugin = ({ addBase }: corePluginsOptions) => {
    const preflightStyles = postcss.parse(
      fs.readFileSync(path.join(__dirname, './css/preflight.css'), 'utf8'),
    );
    addBase([
      postcss.comment({
        text: `© ${pluginName} v${webSegmentVersion} | ${licenceType} | ${website}`,
      }),
      ...preflightStyles.nodes,
    ])
}

