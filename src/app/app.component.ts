import { Component } from '@angular/core'
import { I18n } from '@ngx-translate/i18n-polyfill'
import { setCookie, clearCookie } from '../cookies'
@Component({
  selector: 'main-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name: string
  count: number

  public constructor(private i18n: I18n) {
    this.name = 'Angular'
    this.count = 0
    console.log(this.i18n({ value: 'Some message', id: 'testingThis' }))
  }
  onClickSetCookie(value: any) {
    setCookie('locale', value, 1)
    location.reload()
  }

  onClickClearCookie() {
    clearCookie('locale')
    location.reload()
  }

  onClickSetAlert() {
    let name = 'World'
    let name2 = 'i18n'
    let testing = this.i18n({value: 'Hello2 {{name}}!', id: 'testingId'}, {name});
    alert(testing);
    console.log(this.i18n({value: 'Goodbye {{name2}}!', id: 'goodbyeId'}, {name2}));
  }
}
