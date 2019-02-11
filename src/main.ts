import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core'
import { AppModule } from './app/app.module'
import { PRODUCTION } from './environments/Variables'
import { getCookie } from './cookies'

if (PRODUCTION) {
  enableProdMode()
}
declare const require: any

function moduleIsAvailable(path: string) {
  try {
    require.resolve('./i18n/messages.' + path + '.xlf')
    return true
  } catch (e) {
    return false
  }
}

// https://angular.io/guide/i18n#merge-jit
// we use the webpack raw-loader to return the content as a string
const translations = () => {
  const localeCookie = getCookie('locale')
  console.log('checkCookie', localeCookie)
  let returnValue = null
  // check some cookie.
  // if language set and a locale or language code matches, use that
  // else
  if (localeCookie) {
    return (returnValue =
      localeCookie !== 'en' ? require(`./i18n/messages.${localeCookie}.xlf`) : null)
  }

  // check browser locale
  // if not found, go to first two letters
  // if not found go to english
  if (moduleIsAvailable(window.navigator.language)) {
    returnValue = require(`./i18n/messages.${window.navigator.language}.xlf`)
  } else {
    const backupLocale = window.navigator.language.slice(0, 2)
    returnValue = moduleIsAvailable(backupLocale)
      ? (returnValue = require(`./i18n/messages.${backupLocale}.xlf`))
      : (returnValue = null)
  }
  return returnValue
}

// Questions
// can we break messages.xlf into multiple files (modular)
// is there an existing utility that will highlight missing translation units
// is there an existing util that will highlight extra translation units
// is there a utility that will identify i18n with no id
// is there a utility that will identify duplicate keys

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [
    { provide: TRANSLATIONS, useValue: translations() },
    { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' }
  ]
})
