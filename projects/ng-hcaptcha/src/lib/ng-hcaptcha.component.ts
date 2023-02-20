import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnInit,
  Inject,
  NgZone,
  Output,
  EventEmitter,
  forwardRef,
  PLATFORM_ID,
  OnDestroy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Subscription } from 'rxjs';
import { CAPTCHA_CONFIG, CaptchaConfig } from './ng-hcaptcha-config';
import { loadHCaptcha } from './hcaptcha-utils';

declare const window: any;

@Component({
  selector: 'ng-hcaptcha',
  template: '<div #captcha class="h-captcha"></div>',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgHcaptchaComponent),
      multi: true
    }
  ]
})
export class NgHcaptchaComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() siteKey: string;
  @Input() theme: string;
  @Input() size: string;
  @Input() tabIndex: number;
  @Input() languageCode: string;

  @ViewChild('captcha', { static: true }) captcha: ElementRef;

  @Output() verify: EventEmitter<string> = new EventEmitter<string>();
  @Output() expired: EventEmitter<any> = new EventEmitter<any>();
  @Output() error: EventEmitter<any> = new EventEmitter<any>();

  private _value: string;
  private widgetId: string;
  private captcha$: Subscription;

  onChange: any = () => {};
  onTouched: any = () => {};


  constructor(
    @Inject(CAPTCHA_CONFIG) private config: CaptchaConfig,
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId
  ) {}


  // Initialization

  ngOnInit() {
    // Use language code from module config when input parameter is not set
    if (!this.languageCode) {
      this.languageCode = this.config.languageCode;
    }

    // Do not load hCaptcha if platform is server
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.captcha$ = loadHCaptcha(this.languageCode).subscribe(
      () => {
        setTimeout((context) => {
          // Configure hCaptcha
          const options = {
            sitekey: (context.siteKey || context.config.siteKey),
            theme: context.theme,
            size: context.size,
            tabindex: context.tabIndex,
            callback: (res) => { context.zone.run(() => context.onVerify(res)); },
            'expired-callback': (res) => { context.zone.run(() => context.onExpired(res)); },
            'error-callback': (err) => { context.zone.run(() => context.onError(err)); }
          };

          // Render hCaptcha using the defined options
          context.widgetId = window.hcaptcha.render(context.captcha.nativeElement, options);
        }, 50, this);
      },
      (error) => {
        console.error('Failed to load hCaptcha script', error);
      }
    );
  }

  ngOnDestroy() {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.captcha$.unsubscribe();
  }

  // ControlValueAccessor implementation

  writeValue(value: string) {
    // Needs to be implemented to make the FormGroup's reset function work
    this.value = value;

    // Reset hCaptcha.
    // We need to check whether window.hcaptcha is defined because
    // writeValue(value: any) can be called before hCaptcha has been intialized.
    if (isPlatformBrowser(this.platformId) && !this.value && window.hcaptcha) {
      window.hcaptcha.reset(this.widgetId);
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  reset() {
    window.hcaptcha.reset(this.widgetId);
  }

  get value() {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
  }


  // Internal functions

  /**
   * Is called when the verification was successful
   * @param response The verification token
   */
  private onVerify(response: string) {
    this.value = response;
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
