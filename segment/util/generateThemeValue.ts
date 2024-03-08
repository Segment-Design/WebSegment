import postcss from 'postcss'
import { isPlainObject } from './isPlainObject'

type ThemeSection = any; // Possible theme sections
type ThemeValue = any; // Replace with a more specific type if possible
const processThemeValue = (themeSection: ThemeSection) => {
  if (['fontSize', 'outline'].includes(themeSection)) {
    return (value: ThemeValue) => {
      if (typeof value === 'function') value = value({})
      if (Array.isArray(value)) value = value[0]
      return value;
    };
  }

  if (themeSection === 'fontFamily') {
    return (value: ThemeValue) => {
      if (typeof value === 'function') value = value({})
      const families = Array.isArray(value) && isPlainObject(value[1]) ? value[0] : value;
      return Array.isArray(families) ? families.join(', ') : families;
    }
  }

  if ([
      'boxShadow',
      'transitionProperty',
      'transitionDuration',
      'transitionDelay',
      'transitionTimingFunction',
      'backgroundImage',
      'backgroundSize',
      'backgroundColor',
      'cursor',
      'animation',
    ].includes(themeSection)
  ) {
    return (value: ThemeValue) => {
      if (typeof value === 'function') value = value({})
      if (Array.isArray(value)) value = value.join(', ')
      return value;
    }
  }

  // For backwards compatibility reasons, before we switched to underscores
  // instead of commas for arbitrary values.
  if (['gridTemplateColumns', 'gridTemplateRows', 'objectPosition'].includes(themeSection)) {
    return (value: ThemeValue) => {
      if (typeof value === 'function') value = value({})
      if (typeof value === 'string') value = postcss.list.comma(value).join(' ')
      return value
    }
  }
};
export const generateThemeValue = (themeSection: string) => {
  processThemeValue(themeSection);
  return (value: ThemeValue, opts = {}) => {
    if (typeof value === 'function') {
      value = value(opts)
    }
    return value
  }
}
