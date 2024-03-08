/**
 * Web Segment by Segment Design
 * @author (@Stuffincode) - Riaz Ahamed <https://www.riazahamed.io>
 */
import path from 'path';
import fs from 'fs';
import postcss from 'postcss';
import { version as webSegmentVersion } from "../package.json";
// Interfaces
import {
  accessibilityOptions, breakpointResolution,
  corePluginsOptions, corePluginsReturnParamsOptions, MinWidthToPaddingOptions, normalizeScreenOptions, PaddingValue,
  preflightParamOptions, Screen
} from './interfaces/corePlugins.interface';
import {normalizeScreens} from "./util/normalizeScreens";

const env: { pluginName: string, licenceType: string, website: string } = {
  pluginName: 'WebSegment',
  licenceType: 'MIT LICENCE',
  website: 'https://www.segmentdesign.com'
};

/**
 * Object container for core plugins, providing essential utilities and functionalities.
 * @namespace corePlugins
 */
export const corePlugins: corePluginsOptions = {
  /**
   * f() that allows to set preflight css and adds metadata to css
   * @param {function} addBase - For adding metadata into file header and includes style nodes
   */
  preflight: ({ addBase }: preflightParamOptions) => preflightPlugin({ addBase }),
  /**
   * @constructor {function()} container - IIFE Call
   * @members {function} exactMinWidths - Returns
   */
  container: (function() {
    /**
     * @function
     * @name exactMinWidths
     * @returns list of breakpoints with only minimum width
     */
    function extractMinWidths(breakpoints: Array<{ values: breakpointResolution[] }> = []): (string | number)[] {
      return breakpoints
        .flatMap(breakpoints => breakpoints.values.map((value: breakpointResolution) => value.min))
        .filter((min): min is string | number => min !== undefined); // Type guard
    }

    function mapMinWidthsToPadding(
      minWidths?: (number | string)[],
      screens?: (Screen | normalizeScreenOptions)[],
      paddings?: PaddingValue
    ): MinWidthToPaddingOptions[] {
      if (typeof paddings === 'undefined') { return[] }
      if (!(typeof paddings === 'object' && paddings !== null)) {
        return[{
          screen: 'DEFAULT',
          padding: paddings,
          minWidth: 0,
        }]
      }
      if (paddings.DEFAULT) {
        return[{
          screen: 'DEFAULT',
          padding: paddings.DEFAULT,
          minWidth: 0,
        }];
      }

      const mapping: MinWidthToPaddingOptions[] = [];

      for (const minWidth of minWidths || []) {
        for (const screen of screens || []) {
          for (const { min }  of screen.values) {
            if (min === minWidth) {
              mapping.push({ minWidth, padding: paddings[screen.name] });
            }
          }
        }
      }
      return mapping;
    }

    return function({ addComponents, theme }: corePluginsReturnParamsOptions): any {
      const screens = normalizeScreens(
        theme('container.screens', theme('screens')),
      );
      const minWidths = extractMinWidths(screens);
      const paddings = mapMinWidthsToPadding(minWidths, screens, theme('container.padding'));

    }

  })(),

  accessibility: ({ addUtilities }: accessibilityOptions) => {
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


const preflightPlugin = ({ addBase }: preflightParamOptions) => {
    const preflightStyles = postcss.parse(
      fs.readFileSync(path.join(__dirname, './css/preflight.css'), 'utf8'),
    );
    addBase([
      postcss.comment({
        text: `© ${env.pluginName} v${webSegmentVersion} | ${env.licenceType} | ${env.website}`,
      }),
      ...preflightStyles.nodes,
    ])
}

