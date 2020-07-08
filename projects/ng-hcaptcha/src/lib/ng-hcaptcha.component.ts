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
  PLATFORM_ID
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CAPTCHA_CONFIG, CaptchaConfig } from './ng-hcaptcha-config';
import { loadHCaptcha } from './hcaptcha-utils';
import { isPlatformServer } from '@angular/common';

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
export class NgHcaptchaComponent implements OnInit, ControlValueAccessor {

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

    // Load the hCaptcha script
    loadHCaptcha(this.languageCode).subscribe(
      () => {
        // Configure hCaptcha
        const options = {
          sitekey: (this.siteKey || this.config.siteKey),
          theme: this.theme,
          size: this.size,
          tabindex: this.tabIndex,
          callback: (res) => { this.zone.run(() => this.onVerify(res)); },
          'expired-callback': (res) => { this.zone.run(() => this.onExpired(res)); },
          'error-callback': (err) => { this.zone.run(() => this.onError(err)); }
        };

        // Render hCaptcha using the defined options
        window.hcaptcha.render(this.captcha.nativeElement, options);

        // Get widget ID
        this.widgetId = this.findWidgetId();
      },
      (error) => {
        console.error('Failed to load hCaptcha script', error);
      }
    );
  }


  // ControlValueAccessor implementation

  writeValue(value: string) {
    // Needs to be implemented to make the FormGroup's reset function work
    this.value = value;

    // Reset hCaptcha.
    // We need to check whether window.hcaptcha is defined because
    // writeValue(value: any) can be called before hCaptcha has been intialized.
    if (!this.value && window.hcaptcha) {
      window.hcaptcha.reset(this.widgetId);
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
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

  /**
   * Find the widget ID of the hCaptcha container.
   */
  private findWidgetId(): string {
    const children = this.captcha.nativeElement.children;

    for (let i = 0; i < children.length; i++) {
      // Found correct children when the hcaptchaWidgetId dataset property is set
      if (children[i] && children[i].dataset && children[i].dataset.hcaptchaWidgetId) {
        return children[i].dataset.hcaptchaWidgetId;
      }
    }

    return null;
  }

}
