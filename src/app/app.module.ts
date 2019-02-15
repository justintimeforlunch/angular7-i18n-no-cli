import {
  LOCALE_ID,
  NgModule,
  MissingTranslationStrategy,
  TRANSLATIONS,
  TRANSLATIONS_FORMAT
} from '@angular/core'
import { AppComponent } from './app.component'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { I18n, MISSING_TRANSLATION_STRATEGY } from '@ngx-translate/i18n-polyfill'
import { translations } from './../provideTranslations'

@NgModule({
  imports: [BrowserModule, HttpClientModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    I18n,
    { provide: TRANSLATIONS, useValue: translations() || 'en' },
    { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
    { provide: LOCALE_ID, useValue: window.navigator.language },
    { provide: MISSING_TRANSLATION_STRATEGY, useValue: MissingTranslationStrategy.Ignore }
  ]
})
export class AppModule {}
