import { fetch, FetchResultTypes } from '@sapphire/fetch';
import { stringify } from 'querystring';
import type { ISearchResult } from '..';

export class Pandrama {
  public static isPaid: boolean = false;

  public static async search(query: string): Promise<ISearchResult[]> {
    const response = await fetch<IPandramaResponse>(
			`https://pandrama.com/wp-json/dooplay/search?${
        stringify({
          keyword: query,
          nonce: 'e2bd009b68'
        })
      }`,
			{
				headers: {
					'Content-Type': 'application/json'
				},
			},
			FetchResultTypes.JSON
		);

    if (response.error) {
      if (response.error as any === 'no_posts') return [];
      throw new Error(response.title as any);
    }

    return Object.values(response).map((item) => ({
      title: item.title,
      url: item.url
    }));
  }
}

export interface IPandramaResponse {
  [key: 'error' | 'title' | string]: {
    title: string;
    url: string;
    img: string;
    extra?: {
      date: string;
      imdb: string;
    }
  };
}
