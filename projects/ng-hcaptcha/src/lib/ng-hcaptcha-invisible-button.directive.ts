import { Directive, ElementRef, EventEmitter, HostListener, Inject, Input, NgZone, OnInit, Output } from '@angular/core';
import { CAPTCHA_CONFIG, CaptchaConfig } from './ng-hcaptcha-config';
import { loadHCaptcha } from './hcaptcha-utils';

declare const window: any;

@Directive({
  selector: '[ngHcaptchaInvisibleButton]'
})
export class NgHcaptchaInvisibleButtonDirective implements OnInit {

  @Input() siteKey: string;

  @Output() verify: EventEmitter<string> = new EventEmitter<string>();
  @Output() expired: EventEmitter<any> = new EventEmitter<any>();
  @Output() error: EventEmitter<any> = new EventEmitter<any>();
  @Output() click: EventEmitter<any> = new EventEmitter<any>();

  private lastClickEvent: any;

  constructor(private elRef: ElementRef,
              @Inject(CAPTCHA_CONFIG) private config: CaptchaConfig,
              private zone: NgZone) { }

  ngOnInit() {
    // Load the hCaptcha script
    loadHCaptcha().subscribe(
      () => {
        // Configure hCaptcha
        const options = {
          sitekey: (this.siteKey || this.config.siteKey),
          size: 'invisible',
          callback: (res) => { this.zone.run(() => this.onVerify(res)); },
          'expired-callback': (res) => { this.zone.run(() => this.onExpired(res)); },
          'error-callback': (err) => { this.zone.run(() => this.onError(err)); }
        };

        // Render hCaptcha using the defined options
        window.hcaptcha.render(this.elRef.nativeElement, options);
      });
  }

  @HostListener('click', ['$event'])
  onClick(event) {
    if (event.hCaptchaToken) {
      return;
    }

    this.lastClickEvent = event;
    event.stopPropagation();
    event.preventDefault();
    event.cancelBuble = true;
    event.stopImmediatePropagation();
    window.hcaptcha.execute();
    return false;
  }

  /**
   * Is called when the verification was successful
   * @param response The verification token
   */
  private onVerify(response: string) {
    const event = this.lastClickEvent || {};
    event.hCaptchaToken = response;
    this.click.emit(event);
    this.verify.emit(response);
  }

  /**
   * Is called when the verification has expired
   * @param response The verification response
   */
  private onExpired(response: any) {
    this.expired.emit(response);
  }

  /**
   * Is called when an error occurs during the verification process
   * @param error The error returned by hCaptcha
   */
  private onError(error: any) {
    this.error.emit(error);
  }

}
