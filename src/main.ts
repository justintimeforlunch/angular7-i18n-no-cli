import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import {
  enableProdMode,
  TRANSLATIONS,
  TRANSLATIONS_FORMAT,
} from '@angular/core'
import { AppModule } from './app/app.module'
import { PRODUCTION } from './environments/Variables'
import { translations } from './provideTranslations'

if (PRODUCTION) {
  enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [
    { provide: TRANSLATIONS, useValue: translations() || 'en' },
    { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
  ]
})
