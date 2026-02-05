/**
 * Configuration constants for the XKCD plugin
 */

export const XKCD_PROXY_PATH = '/proxy/xkcd-proxy/';
export const DEFAULT_MAX_COUNT = 3202;
export const LAST_INDEX = -1;

export const XKCD_URLS = {
  comic: (num: number) => `https://xkcd.com/${num}`,
  explain: (num: number) => `https://www.explainxkcd.com/wiki/index.php/${num}`,
} as const;
