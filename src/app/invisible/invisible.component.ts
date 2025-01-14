import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'hc-invisible',
    templateUrl: './invisible.component.html',
    styleUrls: ['./invisible.component.scss'],
    standalone: false
})
export class InvisibleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onVerify(response) {
    console.log('Invisible verified', response);
  }

  onError(error) {
    console.log('Invisible error', error);
  }

  onExpired(response) {
    console.log('Invisible expired', response);
  }

}
