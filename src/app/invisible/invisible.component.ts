import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hc-invisible',
  templateUrl: './invisible.component.html',
  styleUrls: ['./invisible.component.scss']
})
export class InvisibleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClick(event) {
    console.log('onClick', event);
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
