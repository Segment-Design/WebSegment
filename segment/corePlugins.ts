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
  accessibilityOptions,
  breakpointResolution,
  corePluginsOptions,
  corePluginsReturnParamsOptions,
  MinWidthToPaddingOptions,
  normalizeScreenOptions,
  PaddingOptions,
  PaddingValue,
  preflightParamOptions,
  Screen
} from './interfaces/corePlugins.interface';
import {normalizeScreens} from "./util/normalizeScreens";
import {classList} from "./helper";
import {generateUtilityPlugin} from "./util/generateUtilityPlugin";

export const env: { pluginName: string, licenceType: string, website: string, varPrefix: string } = {
  pluginName: 'WebSegment',
  licenceType: 'MIT LICENCE',
  website: 'https://www.segmentdesign.com',
  varPrefix: '--sg'
};
const isSupportsNegativeValuesDefault: { supportsNegativeValues: boolean } = {supportsNegativeValues: true};
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
      const generatePaddingFor = (minWidth: (number | string)): PaddingOptions => {
        const paddingConfig =
          paddings.find((padding: any) => padding.minWidth === minWidth,
        );
        if (!paddingConfig) { return {}; }
        return {
          paddingRight: paddingConfig.padding,
          paddingLeft: paddingConfig.padding,
        };
      };

      const atRules = Array.from(
        new Set(minWidths.slice().sort((a, z) => parseInt(<string>a) - parseInt(<string>z))),
      ).map((minWidth) => ({
        [`@media (min-width: ${minWidth})`]: {
          ".container": {
            "max-width": minWidth,
            ...generatePaddingFor(minWidth),
          },
        },
      }));
      addComponents([{
        ".container": Object.assign({}, { width: "100%" }, theme("container.center", false)
              ? { marginRight: "auto", marginLeft: "auto" }
              : {},
            generatePaddingFor(0)),
        },
        ...atRules,
      ]);
    }
  })(),

  accessibility: ({ addUtilities }: accessibilityOptions) => addUtilities({...classList.accessibility}),
  pointerEvents: ({ addUtilities }: accessibilityOptions) => addUtilities({...classList.pointerEvents}),
  visibility: ({ addUtilities }: accessibilityOptions) => addUtilities({...classList.visibility}),
  position: ({ addUtilities }: accessibilityOptions) => addUtilities({...classList.position}),
  inset: generateUtilityPlugin("inset", classList.insetProperties, isSupportsNegativeValuesDefault),
  isolation: ({ addUtilities }: accessibilityOptions) => addUtilities({...classList.isolation}),
  zIndex: generateUtilityPlugin("zIndex", classList.zIndexProperties, isSupportsNegativeValuesDefault),
  order: generateUtilityPlugin("order", undefined, isSupportsNegativeValuesDefault),
  gridColumn: generateUtilityPlugin("gridColumn", classList.grid.columnProperties),
  gridColumnStart: generateUtilityPlugin("gridColumnStart", classList.grid.columnStartProperties),
  gridColumnEnd: generateUtilityPlugin("gridColumnEnd", classList.grid.columnEndProperties),
  gridRow: generateUtilityPlugin("gridRow", classList.grid),
  gridRowStart: generateUtilityPlugin("gridRowStart", classList.grid.rowStartProperties),
  gridRowEnd: generateUtilityPlugin("gridRowEnd", classList.grid.rowEndProperties),
  float: ({ addUtilities }: accessibilityOptions) => addUtilities({...classList.float}),
  clear: ({ addUtilities }: accessibilityOptions) => addUtilities({...classList.clear}),
  margin: generateUtilityPlugin("margin", classList.marginProperties, isSupportsNegativeValuesDefault),
  boxSizing: ({ addUtilities }: accessibilityOptions) => addUtilities({...classList.boxSizing}),
  lineClamp: ({ matchUtilities, addUtilities, theme }: any) => {
    matchUtilities({
        "line-clamp": (value: any) => ({
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": `${value}`,
        }),
      },
      { values: theme("lineClamp") },
    );
    addUtilities({...classList.lineComp});
  },
  display: ({ addUtilities }: accessibilityOptions) => addUtilities({...classList.display}),
  aspectRatio: generateUtilityPlugin("aspectRatio", classList.aspectRatio),
  size: generateUtilityPlugin("size", classList.size),
  height: generateUtilityPlugin("height", classList.height.base),
  maxHeight: generateUtilityPlugin("maxHeight", classList.height.max),
  minHeight: generateUtilityPlugin("minHeight", classList.height.min),
  width: generateUtilityPlugin("width", classList.width.base),
  minWidth: generateUtilityPlugin("minWidth", classList.width.max),
  maxWidth: generateUtilityPlugin("maxWidth", classList.width.min),
  flex: generateUtilityPlugin("flex"),
  flexShrink: generateUtilityPlugin("flexShrink", classList.flex.shrink),
  flexGrow: generateUtilityPlugin("flexGrow", classList.flex.grow),
  flexBasis: generateUtilityPlugin("flexBasis", classList.flex.basis),
  tableLayout: ({ addUtilities }: accessibilityOptions) => addUtilities({...classList.tableLayout}),
  captionSide: ({ addUtilities }: accessibilityOptions) => addUtilities({...classList.captionSide}),
  borderCollapse: ({ addUtilities }: accessibilityOptions) => addUtilities({...classList.borderCollapse}),
  borderSpacing: ({ addDefaults, matchUtilities, theme }) => {
    addDefaults("border-spacing", {...classList.borderSpacing});

    matchUtilities({
        "border-spacing": (value: any) => {
          return {
            "--sg-border-spacing-x": value,
            "--sg-border-spacing-y": value,
            "@defaults border-spacing": {},
            "border-spacing":
              "var(--sg-border-spacing-x) var(--sg-border-spacing-y)",
          };
        },
        "border-spacing-x": (value: any) => {
          return {
            "--sg-border-spacing-x": value,
            "@defaults border-spacing": {},
            "border-spacing":
              "var(--sg-border-spacing-x) var(--sg-border-spacing-y)",
          };
        },
        "border-spacing-y": (value: any) => {
          return {
            "--sg-border-spacing-y": value,
            "@defaults border-spacing": {},
            "border-spacing":
              "var(--sg-border-spacing-x) var(--sg-border-spacing-y)",
          };
        },
      },
      { values: theme("borderSpacing") },
    );
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

