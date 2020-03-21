import { Component, Host, HostBinding } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cfcai-frontend';
  @HostBinding('class.cover-container') coverContainer = true;
  @HostBinding('class.d-flex') dFlex = true;
  @HostBinding('class.w-100') coverW100 = true;
  @HostBinding('class.h-100') h100 = true;
  @HostBinding('class.p-3') p3 = true;
  @HostBinding('class.mx-auto') mxAuto = true;
  @HostBinding('class.flex-column') mxFlexColumn = true;

}
