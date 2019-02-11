import { Component } from '@angular/core'
import { setCookie, clearCookie } from '../cookies';
@Component({
  selector: 'main-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name: string
  count: number

  public constructor() {
    this.name = 'Angular'
    this.count = 0
  }
  onClickSetCookie(value: any) {
    setCookie('locale', value, 1);
    location.reload();
  }

  onClickClearCookie() {
    clearCookie('locale');
    location.reload();
  }
}
