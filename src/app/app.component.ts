import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
    selector: 'hc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  appVersion = environment.version;
}
