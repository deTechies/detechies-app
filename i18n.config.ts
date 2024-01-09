export const i18n = {
    defaultLocale: 'kr',
    locales: ['kr', 'en']
  } as const
  
export type Locale = (typeof i18n)['locales'][number]