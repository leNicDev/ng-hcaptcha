import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgHcaptchaService } from 'ng-hcaptcha';

@Component({
    selector: 'hc-programmatically',
    templateUrl: './programmatically.component.html',
    styleUrls: ['./programmatically.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ProgrammaticallyComponent {

  constructor(private hcaptchaService: NgHcaptchaService) { }

  verify() {
    this.hcaptchaService.verify().subscribe(
      (result) => {
        console.log('SUCCESS', result);
      },
      (err) => {
        console.log('FAILED', err);
      },
      () => {
        console.log('COMPLETE');
      }
    );
  }

}
