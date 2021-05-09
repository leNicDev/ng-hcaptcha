import { Directive, ElementRef, EventEmitter, HostListener, Inject, Input, NgZone, OnInit, Output, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Subscription } from 'rxjs';
import { CAPTCHA_CONFIG, CaptchaConfig } from './ng-hcaptcha-config';
import { loadHCaptcha } from './hcaptcha-utils';

declare const window: any;

@Directive({
  selector: '[ngHcaptchaInvisibleButton]'
})
export class NgHcaptchaInvisibleButtonDirective implements OnInit, OnDestroy {

  @Input() siteKey: string;
  @Input() languageCode: string;

  @Output() verify: EventEmitter<string> = new EventEmitter<string>();
  @Output() expired: EventEmitter<any> = new EventEmitter<any>();
  @Output() error: EventEmitter<any> = new EventEmitter<any>();
  @Output() click: EventEmitter<any> = new EventEmitter<any>();

  private lastClickEvent: any;
  private captcha$: Subscription;
  private widgetId: string;

  constructor(private elRef: ElementRef,
              @Inject(CAPTCHA_CONFIG) private config: CaptchaConfig,
              private zone: NgZone,
              @Inject(PLATFORM_ID) private platformId) { }

  ngOnInit() {
    // Use language code from module config when input parameter is not set
    if (!this.languageCode) {
      this.languageCode = this.config.languageCode;
    }

    // Do not load hCaptcha if platform is server
    if (isPlatformServer(this.platformId)) {
      return;
    }

    // Load the hCaptcha script
    this.captcha$ = loadHCaptcha(this.languageCode).subscribe(
      () => {
        setTimeout((context) => {
          // Configure hCaptcha
          const options = {
            sitekey: (context.siteKey || context.config.siteKey),
            size: 'invisible',
            callback: (res) => { context.zone.run(() => context.onVerify(res)); },
            'expired-callback': (res) => { context.zone.run(() => context.onExpired(res)); },
            'error-callback': (err) => { context.zone.run(() => context.onError(err)); }
          };

          // Render hCaptcha using the defined options
          context.widgetId = window.hcaptcha.render(context.elRef.nativeElement, options);
        }, 50, this);
      });
  }

  ngOnDestroy() {
    this.captcha$.unsubscribe();
  }

  @HostListener('click', ['$event'])
  onClick(event: any): boolean {
    if (event.hCaptchaToken) {
      return;
    }

    this.lastClickEvent = event;
    event.stopPropagation();
    event.preventDefault();
    event.cancelBubble = true;
    // event.stopImmediatePropagation();

    // Only execute hCaptcha if platform is browser
    if (isPlatformBrowser(this.platformId)) {
      window.hcaptcha.execute(this.widgetId);
    }

    return false;
  }

  /**
   * Is called when the verification was successful
   * @param response The verification token
   */
  private onVerify(response: string): void {
    const event = this.lastClickEvent || {};
    event.hCaptchaToken = response;
    this.click.emit(event);
    this.verify.emit(response);
  }

  /**
   * Is called when the verification has expired
   * @param response The verification response
   */
  private onExpired(response: any): void {
    this.expired.emit(response);
  }

  /**
   * Is called when an error occurs during the verification process
   * @param error The error returned by hCaptcha
   */
  private onError(error: any): void {
    this.error.emit(error);
  }

}
