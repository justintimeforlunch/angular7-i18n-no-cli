import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core'
import { AppModule } from './app/app.module'
import { PRODUCTION } from './environments/Variables'

if (PRODUCTION) {
  enableProdMode()
}
// https://angular.io/guide/i18n#merge-jit
// we use the webpack raw-loader to return the content as a string
const translations =
  window.navigator.language !== 'en-US'
    ? require(`raw-loader!./i18n/messages.${window.navigator.language}.xlf`)
    : null

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [
    { provide: TRANSLATIONS, useValue: translations },
    { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' }
  ]
})
