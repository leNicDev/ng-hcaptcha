import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'hc-invisible',
    templateUrl: './invisible.component.html',
    styleUrls: ['./invisible.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class InvisibleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onVerify(response: any) {
    console.log('Invisible verified', response);
  }

  onError(error: any) {
    console.log('Invisible error', error);
  }

  onExpired(response: any) {
    console.log('Invisible expired', response);
  }

}
