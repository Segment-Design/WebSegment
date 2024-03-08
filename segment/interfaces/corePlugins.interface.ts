/**
 * Core Plugin options
 * @property {function?} addBase - f() For adding metadata into file header and includes style nodes
 * @property {function?} container - f() IIFE Init
 */
export interface corePluginsOptions {
  preflight: (addBase: preflightParamOptions) => void;
  container: IIFE<any[], any>;
  accessibility: IIFE<any[], any>;
}
interface IIFE<TArgs extends any[], TReturn> {
  (...args: TArgs): TReturn;
}
export interface corePluginsReturnParamsOptions {
  addComponents: any,
  theme: any
}
export interface preflightParamOptions {
  addBase: IIFE<any[], any>;
}
export interface accessibilityOptions {
  addUtilities: IIFE<any[], any>
}
export interface normalizeScreenOptions {
  name: any;
  not: boolean;
  values: breakpointResolution[];
}
export interface breakpointResolution {
 'min-width'?: string | number | unknown,
  min?: string | number | unknown,
  max?: string | number | unknown,
  raw?: string | number | unknown
}

export interface Screen {
  name: string;
  values: Array<{ min: number }>; // Assuming 'min' is always a number
}

export interface PaddingValue { // For individual padding values
  DEFAULT?: number; // Assuming DEFAULT is optional
  [screenName: string]: number | undefined; // For screen-specific padding
}

export interface MinWidthToPaddingOptions {
  screen?: number | string;
  padding?: number | string;
  minWidth?: number | string;
}
