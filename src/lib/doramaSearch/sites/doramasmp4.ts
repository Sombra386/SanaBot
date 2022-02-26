import { fetch, FetchResultTypes } from '@sapphire/fetch';
import { URL } from 'url';

export class DoramasMP4 {
  public static async search(query: string, limit: number = 5): Promise<IDoramasMP4SearchResult[]> {
    const baseUrl = await this.getBaseURL();
    const response = await fetch<IDoramasMP4SearchResult[]>(
      `${baseUrl}/api/web/autocomplete/titles`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          search: query,
          limit
        }),
      },
      FetchResultTypes.JSON
    );

    return response;
  }

  /**
   * Get the current DoramasMP4 base URL, since they like to change it.
   */
  public static async getBaseURL(): Promise<string> {
    const response = await fetch('https://www.doramasmp4.com', {
      method: 'HEAD'
    }, FetchResultTypes.Result);

    if (!response.redirected) throw new Error('Failed to get base URL');

    return new URL(response.url).origin;
  }
}

export interface IDoramasMP4SearchResult {
  id: number;
  title: string;
  slug: string;
  poster: string;
  backdrop: string;
  type: 'movie' | 'tv';
  path: string;
}
