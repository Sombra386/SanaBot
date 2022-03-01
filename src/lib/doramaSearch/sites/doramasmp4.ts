import { fetch, FetchResultTypes } from '@sapphire/fetch';
import { URL } from 'url';
import type { ISearchResult } from '..';

export class DoramasMP4 {
	public static isPaid: boolean = false;

	public static async search(query: string): Promise<ISearchResult[]> {
		const baseUrl = await this.getBaseURL();
		const response = await fetch<IDoramasMP4SearchResult[]>(
			`${baseUrl}/api/web/autocomplete/titles`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					search: query,
					limit: 5
				})
			},
			FetchResultTypes.JSON
		);

		return response.map((item) => ({
			title: item.title,
			url: `${baseUrl}/${item.slug}`
		}));
	}

	/**
	 * Get the current DoramasMP4 base URL, since they like to change it.
	 */
	public static async getBaseURL(): Promise<string> {
		const response = await fetch(
			'https://www.doramasmp4.com',
			{
				method: 'HEAD'
			},
			FetchResultTypes.Result
		);

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
