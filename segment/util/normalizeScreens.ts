import {normalizeScreenOptions, breakpointResolution} from "../interfaces/corePlugins.interface";

export const normalizeScreens = (screens: unknown, root: boolean = true): normalizeScreenOptions[] => {
  if (Array.isArray(screens)) {
    return screens.map((screen) => {
      if (root && Array.isArray(screen)) {
        throw new Error('The tuple syntax is not supported for `screens`.');
      }

      if (typeof screen === 'string') {
        return { name: screen.toString(), not: false, values: [{ min: screen, max: undefined }] };
      }

      let [name] = screen;
      const [options] = screen;
      name = name.toString();

      if (typeof options === 'string') {
        return { name, not: false, values: [{ min: options, max: undefined }] };
      }

      if (Array.isArray(options)) {
        return { name, not: false, values: options.map((option) => resolveValue(option)) }
      }

      return { name, not: false, values: [resolveValue(options)] }
    })
  }
  return normalizeScreens(Object.entries(screens ?? {}), false)
}

function resolveValue({ 'min-width': _minWidth, min = _minWidth, max, raw }: breakpointResolution = {}): breakpointResolution {
  return { min, max, raw };
}
