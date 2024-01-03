export const i18n = {
    defaultLocale: 'kr',
    locales: ['en', 'kr']
  } as const
  
export type Locale = (typeof i18n)['locales'][number]