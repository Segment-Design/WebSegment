import { generateThemeValue } from './generateThemeValue';
export const generateUtilityPlugin = (
  themeKey: string,
  utilityVariations: any = [[themeKey, [themeKey]]],
  { filterDefault = false, ...options }: any = {}
) => {
  const transformValue = generateThemeValue(themeKey);
  return function ({ matchUtilities, theme }: any) {
    for (const utilityVariation of utilityVariations) {
      const group = Array.isArray(utilityVariation[0]) ? utilityVariation : [utilityVariation]

      matchUtilities(
        group.reduce((obj: any, [classPrefix, properties]: any) => {
          return Object.assign(obj, {
            [classPrefix]: (value: any) => {
              return properties.reduce((obj: any, name: any[]) => {
                if (Array.isArray(name)) {
                  return Object.assign(obj, { [name[0]]: name[1] })
                }
                return Object.assign(obj, { [name]: transformValue(value) })
              }, {})
            },
          })
        }, {}),
        {
          ...options,
          values: filterDefault
            ? Object.fromEntries(
              Object.entries(theme(themeKey) ?? {}).filter(([modifier]) => modifier !== 'DEFAULT')
            )
            : theme(themeKey),
        }
      )
    }
  }
}
