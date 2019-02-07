import { LOCALE_ID, NgModule } from '@angular/core'
import { AppComponent } from './app.component'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { CounterService } from './service/CounterService'
console.log('window.navigator.language;',  window.navigator.language);
@NgModule({
  imports: [BrowserModule, HttpClientModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [CounterService, { provide: LOCALE_ID, useValue: window.navigator.language }]
})
export class AppModule {}
