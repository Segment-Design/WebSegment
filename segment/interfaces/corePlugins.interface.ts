/**
 * Core Plugin options
 * @property {function?} addBase - f() For adding metadata into file header and includes style nodes
 * @property {function?} container - f() IIFE Init
 */
interface IIFE_Item<TArgs extends any[], TReturn> {
  (...args: TArgs): TReturn;
}
export interface corePluginsOptions {
  preflight: (addBase: preflightParamOptions) => void;
  container: IIFE_Item<any[], any>;
  accessibility: IIFE_Item<any[], any>;
  pointerEvents: IIFE_Item<any[], any>;
  visibility: IIFE_Item<any[], any>;
  position: IIFE_Item<any[], any>;
  inset: IIFE_Item<any[], any>;
  isolation: IIFE_Item<any[], any>;
  zIndex: IIFE_Item<any[], any>;
  order: IIFE_Item<any[], any>;
  gridColumn: IIFE_Item<any[], any>;
  gridColumnStart: IIFE_Item<any[], any>;
  gridColumnEnd: IIFE_Item<any[], any>;
  gridRow: IIFE_Item<any[], any>;
  gridRowStart: IIFE_Item<any[], any>;
  gridRowEnd: IIFE_Item<any[], any>;
  [className: string]: IIFE_Item<any[], any>;
}
export interface corePluginsReturnParamsOptions {
  addComponents: any,
  theme: any
}
export interface preflightParamOptions {
  addBase: IIFE_Item<any[], any>;
}
export interface accessibilityOptions {
  addUtilities: IIFE_Item<any[], any>
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

export interface MarginOptions {
  marginTop?: number | string;
  marginBottom?: number | string;
  marginRight?: number | string;
  marginLeft?: number | string;
}
export interface PaddingOptions {
  paddingTop?: number | string;
  paddingBottom?: number | string;
  paddingRight?: number | string;
  paddingLeft?: number | string;
}
