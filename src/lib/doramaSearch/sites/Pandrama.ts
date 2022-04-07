import { fetch, FetchResultTypes } from '@sapphire/fetch';
import { stringify } from 'querystring';
import type { ISearchResult } from '..';

export class Pandrama {
  public static isPaid: boolean = false;

  public static async search(query: string): Promise<ISearchResult[]> {
    const response = await fetch<IPandramaResponse>(
			`https://pandrama.com/index.php/ajax/suggest?${
        stringify({
          mid: 1,
          wd: query,
          limit: 10,
          timestamp: Date.now()
        })
      }`,
			{
				headers: {
					'Content-Type': 'application/json'
				},
			},
			FetchResultTypes.JSON
		);

    return Object.values(response.list).map((item) => ({
      title: item.name,
      url: `https://pandrama.com/serie/${item.en}`
    }));
  }
}

export interface IPandramaResponse {
  code: number;
  msg: 'data list';
  page: number;
  pagecount: number;
  limit: number;
  total: number;
  list: {
    id: number;
    name: string;
    en: string;
    pic: string;
  }[];
  url: string;
}
