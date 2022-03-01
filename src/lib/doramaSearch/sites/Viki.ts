import { fetch, FetchResultTypes } from '@sapphire/fetch';
import { stringify } from 'querystring';
import type { ISearchResult } from '..';

export class Viki {
  public static isPaid: boolean = true;

  public static async search(query: string): Promise<ISearchResult[]> {
    const response = await fetch<IVikiSearchResult[]>(
			`https://api.viki.io/v4/search.json?${
        stringify({
          c: query,
          licensed: 0,
          app: '100000a'
        })
      }`,
			{
				headers: {
					'Content-Type': 'application/json'
				},
			},
			FetchResultTypes.JSON
		);

    return Object.values(response).map((item) => ({
      title: item.tt,
      url: `https://www.viki.com${item.u.w}`
    }));
  }
}

export interface IVikiSearchResult {
  id: string;
  /** Type of result */
  t: string;
  /** Translated title */
  tt: string;
  u: {
    /** Watch URL */
    w: string;
    /** API resource URL */
    a: string
  };
  /** Image */
  i: string;
  /** Age rating */
  e: number;
  /** Original language of the content */
  oc: string;
  /** Title in English */
  te?: string;
  /** Title in Japanese */
  tj?: string;
  /** Title in Chinese */
  tzh?: string;
  /** Title in Taiwanese */
  tzt?: string;
  /** Title in Portuguese */
  pt?: string;
  /** Title in Korean */
  ko?: string;
  blocked: boolean;
  blocking?: {
    geo: boolean;
    paywall: boolean;
    upcoming: boolean;
  };
  paywallable?: {
    svod: boolean;
    tvod: boolean;
  }
}
