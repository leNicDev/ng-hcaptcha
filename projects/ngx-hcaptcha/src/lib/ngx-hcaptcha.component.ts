import { Component, Input, ViewChild, ElementRef, OnInit, Inject, NgZone, Output, EventEmitter } from '@angular/core';
import { CAPTCHA_CONFIG, CaptchaConfig } from './ngx-hcaptcha-config';
import { Observable, Subscriber } from 'rxjs';

declare const window: any;

@Component({
  selector: 'ngx-hcaptcha',
  template: '<div #captcha class="h-captcha"></div>',
  styles: []
})
export class NgxHcaptchaComponent implements OnInit {

  @Input() siteKey: string;
  @Input() theme: string;
  @Input() size: string;
  @Input() tabIndex: number;

  @ViewChild('captcha') captcha: ElementRef;

  @Output() verify: EventEmitter<string> = new EventEmitter<string>();
  @Output() expired: EventEmitter<any> = new EventEmitter<any>();
  @Output() error: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    @Inject(CAPTCHA_CONFIG) private config: CaptchaConfig,
    private zone: NgZone
  ) {}


  ngOnInit() {
    // Load the hCaptcha script
    this.loadHcaptcha().subscribe(
      () => {
        // Configure hCaptcha
        const options = {
          sitekey: (this.siteKey || this.config.siteKey),
          theme: this.theme,
          size: this.size,
          tabindex: this.tabIndex,
          callback: (res) => { this.zone.run(() => this.onVerify(res)) },
          'expired-callback': (res) => { this.zone.run(() => this.onExpired(res)) },
          'error-callback': (err) => { this.zone.run(() => this.onError(err)) }
        };

        // Render hCaptcha using the defined options
        window.hcaptcha.render(this.captcha.nativeElement, options);
      },
      (error) => {
        console.error('Failed to load hCaptcha script', error);
      }
    );
  }


  /**
   * Is called when the verification was successful
   * @param response The verification token
   */
  private onVerify(response: string) {
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

  /**
   * Load the hCaptcha script by appending a script element to the head element.
   * The script won't be loaded again if it has already been loaded.
   * Async and defer are set to prevent blocking the renderer while loading hCaptcha.
   */
  private loadHcaptcha(): Observable<void> {
    return new Observable<void>((observer: Subscriber<void>) => {
      // The hCaptcha script has already been loaded
      if (typeof window.hcaptcha !== 'undefined') {
        observer.next();
        observer.complete();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://hcaptcha.com/1/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onerror = (e) => observer.error(e);
      script.onload = () => {
        observer.next();
        observer.complete();
      }
      document.head.appendChild(script);
    });
  }

}
