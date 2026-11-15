import type { UrlRecord } from "../../../api/urlContracts";

export function getUrlSummary(urls: UrlRecord[]) {
  return {
    totalLinks: urls.length,
    totalClicks: urls.reduce((total, url) => total + url.clickCount, 0),
  };
}
