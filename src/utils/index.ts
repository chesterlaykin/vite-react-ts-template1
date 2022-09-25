// import { CookieInformationResponse } from '~/types/state';

// export function hasCookieResponse(response: CookieInformationResponse) {
//   if (
//     response?.marketing !== undefined ||
//     response?.statistic !== undefined ||
//     response?.functional !== undefined ||
//     response?.unclassified !== undefined
//   ) {
//     return true;
//   }

//   return false;
// }

export function hasMedia(query1: string, query2: string = ''): boolean | null {
  // Safe check as matchMedia is not present in SSR.
  if (process.browser) {
    const query = query2 ? `(${query1}) and (${query2})` : `(${query1})`;
    return matchMedia(`screen and ${query}`).matches;
  }

  return null;
}

export function hasMarketingConsent() {
  if (process.client) {
    return (window as any).CookieInformation?.getConsentGivenFor('cookie_cat_marketing');
  }

  return false;
}

export function isMobile(): boolean | null {
  return hasMedia('max-width: 767px');
}

export function isTablet(): boolean | null {
  return hasMedia('min-width: 768px', 'max-width: 992px');
}

// Check if a string is numeric.
export function isNumeric(str: any) {
  if (typeof str !== 'string') {
    return false;
  }

  // @ts-ignore
  return !isNaN(str) && !isNaN(parseFloat(str));
}

export function roundTo(number: any, decimals: any): string {
  return parseFloat(number).toFixed(decimals);
}

// Method to help handle checking for undefined / null values
export function isDefined<T>(val: T | null | undefined): val is T {
  return val !== null && val !== undefined;
}
// Function to help us filter out objects with incomplete data (properties)
export function filterObject<T>(val: T): val is NonNullable<T> {
  return Object.values(val).every(isDefined);
}

export function handleLeadingSlash(url: string): string {
  if (!url || !url.length) return '';
  if (url[0] !== '/') url = '/' + url;
  return url;
}

export function trimChar(text: string, char: string) {
  const flags = 'g';
  if (typeof text !== 'string' || typeof char !== 'string' || typeof flags !== 'string') {
    throw new TypeError('argument must be string');
  }

  if (!/^[gi]*$/.test(flags)) {
    throw new TypeError("Invalid flags supplied '" + flags.match(new RegExp('[^gi]*')) + "'");
  }

  return text.replace(new RegExp('^[' + char + ']+|[' + char + ']+$', flags), '');
}

export function toPascalCase(str: string) {
  return `${str}`
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(new RegExp(/\s+(.)(\w*)/, 'g'), ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`) // eslint-disable-line @typescript-eslint/no-unused-vars
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
}

export function isClientSafari(): boolean | null {
  if (!process.browser) return null;
  const isSafari =
    navigator.vendor &&
    navigator.vendor.includes('Apple') &&
    navigator.userAgent &&
    !navigator.userAgent.includes('CriOS') &&
    !navigator.userAgent.includes('FxiOS');

  return !!isSafari;
}

export function linkTarget(target: string | undefined | null) {
  return target || '_self';
}

export function isInt(number: number) {
  return number % 1 === 0;
}

export function numberToString(number: number, locale: string = 'da-DK'): string {
  return new Intl.NumberFormat(locale).format(number);
}

export function safeGet(object: Object, prop: string): any {
  if (!object) return null;
  return Object.prototype.hasOwnProperty.call(object, prop) ? (object as any)[prop] : null;
}

/**
 * See if property exists in parent object
 * Object property value is expected to be a string
 * Split the string on a provided separator
 */
export function checkPropSplitString(prop: string, obj: any, separator: string = '\n') {
  if (prop in obj && obj[prop] && typeof obj[prop] === 'string') {
    return obj[prop].split(separator);
  }
  return false;
}
// Expects array of strings with the danger icon code ( GHS09, )
// Returns array of coresponding filenames
export function getDangerIconFilenamesByCodes(codes: string[]) {
  const codeToFilename: any = {
    GHS01: 'GHS01_explos',
    GHS02: 'GHS02_flamme',
    GHS03: 'GHS03_rondflam',
    GHS04: 'GHS04_bottle',
    GHS05: 'GHS05_acid_red',
    GHS06: 'GHS06_skull',
    GHS07: 'GHS07_exclam',
    GHS08: 'GHS08_silhouete',
    GHS09: 'GHS09_aq-pollut'
  };

  const filenames: string[] = [];

  for (let index = 0; index < codes.length; index++) {
    if (codes[index] in codeToFilename) {
      filenames.push(codeToFilename[codes[index]]);
    } else {
      // eslint-disable-next-line no-console
      console.log(codes[index] + ' wasnt available');
    }
  }
  return filenames;
}

export function scrollToFirstElementOfClassName(
  className: string,
  blockValue: ScrollLogicalPosition = 'center',
  behavior: ScrollBehavior = 'smooth'
) {
  const elements = document.getElementsByClassName(className);
  if (elements && elements.length) {
    elements[0].scrollIntoView({
      block: blockValue, // start, center, end, or nearest
      behavior // auto, smooth
    });
  }
}

export function stripProtocol(url: string) {
  return url.replace(/^\w*:\/\//, '');
}

export function resolveLinkUrl(absoluteUrl: string, relativeHostnames: Array<string>): string {
  if (!absoluteUrl) return String(absoluteUrl);
  const strippedAbsoluteUrl = stripProtocol(absoluteUrl);

  // When the URL is not absolute.
  if (absoluteUrl[0] === '/' && absoluteUrl[1] !== '/') {
    return absoluteUrl;
  }

  const matchedHostname = relativeHostnames.find(
    (hostname) => strippedAbsoluteUrl && strippedAbsoluteUrl.startsWith(hostname)
  );
  if (matchedHostname) {
    return strippedAbsoluteUrl.replace(matchedHostname, '');
  }

  const defaultProtocol = 'https://';
  if (
    absoluteUrl === strippedAbsoluteUrl &&
    !absoluteUrl.startsWith('//') &&
    !absoluteUrl.startsWith('#') &&
    absoluteUrl !== '/' &&
    absoluteUrl !== ''
  ) {
    // This covers an edge case where there's a URL that is not part of the relative hostnames but mistakingly does not contain a procotol.
    return defaultProtocol + absoluteUrl;
  }

  return absoluteUrl;
}

export function getLinkOrCategory(item: any) {
  if (!isDefined(item)) return item;
  if (item?.category?.view?.url) return item.category.view.url;
  if (item?.link?.reference?.url) return item.link.reference.url;

  return item?.link?.url;
}

export function encodeValue(val: any) {
  if (typeof val === 'string') {
    return val;
  }
  return JSON.stringify(val);
}

export function isUnset(o: null) {
  return typeof o === 'undefined' || o === null;
}

export function concatStringArray(stringArray: string[], separator: string = ', '): string {
  if (!Array.isArray(stringArray)) return stringArray;
  return stringArray.join(separator);
}

export function isObjectAndNotEmpty(data: any) {
  return typeof data === 'object' && data !== null && Object.keys(data).length > 0;
}

export function sortByProp(prop: string) {
  return (a: any, b: any) => {
    if (a[prop] > b[prop]) return 1;
    if (a[prop] < b[prop]) return -1;
    return 0;
  };
}

export function createBreadcrumbs(data: any) {
  let currentBreadcrumb: any = null;
  let parentBreadcrumbs: string[] = [];

  // Breadcrumbs can be either array or nested object
  if (Array.isArray(data) && data.length) {
    const dataCopy = [...data];
    currentBreadcrumb = dataCopy.pop();
    parentBreadcrumbs = dataCopy;
  } else if (isObjectAndNotEmpty(data)) {
    const crumbs = [];
    let currentCrumb: any | undefined = { ...data };
    while (!!currentCrumb) {
      const crumb = currentCrumb;
      crumbs.unshift(crumb);
      if (!crumb?.parent) {
        break;
      }
      currentCrumb = currentCrumb.parent;
    }
    currentBreadcrumb = crumbs.pop();
    parentBreadcrumbs = crumbs;
  }

  return {
    currentBreadcrumb,
    parentBreadcrumbs
  };
}
