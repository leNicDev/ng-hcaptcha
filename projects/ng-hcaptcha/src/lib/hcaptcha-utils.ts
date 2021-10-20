import { Observable, Subscriber } from 'rxjs';

declare const window: any;

/**
 * Load the hCaptcha script by appending a script element to the head element.
 * The script won't be loaded again if it has already been loaded.
 * Async and defer are set to prevent blocking the renderer while loading hCaptcha.
 */
export function loadHCaptcha(languageCode?: string): Observable<void> {
  return new Observable<void>((observer: Subscriber<void>) => {
    // No window object (ssr)
    if (!window) {
      return;
    }

    // The hCaptcha script has already been loaded
    if (typeof window.hcaptcha !== 'undefined') {
      observer.next();
      observer.complete();
      return;
    }

    let src = 'https://hcaptcha.com/1/api.js?render=explicit';

    // Set language code
    if (languageCode) {
      src += "&hl=" + languageCode;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onerror = (e) => observer.error(e);
    script.onload = () => {
      observer.next();
      observer.complete();
    };
    document.head.appendChild(script);
  });
}
