import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core'
import { AppModule } from './app/app.module'
import { PRODUCTION } from './environments/Variables'

if (PRODUCTION) {
  enableProdMode()
}
// https://angular.io/guide/i18n#merge-jit
// we use the webpack raw-loader to return the content as a string
const translations = () => {
  // check some cookie.
  // if language set and a locale or language code matches, use that
  // else
  // check browser locale
  // if not found, go to first two letters
  // if not found go to english

  const returnValue = window.navigator.language !== 'en-US'
      ? require(`raw-loader!./i18n/messages.${window.navigator.language}.xlf`)
      : null;

  return returnValue;
};

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [
    { provide: TRANSLATIONS, useValue: translations() },
    { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' }
  ]
})
