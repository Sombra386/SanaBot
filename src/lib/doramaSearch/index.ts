import { DoramasMP4 } from './sites/DoramasMP4';
import { Pandrama } from './sites/Pandrama';
import { Viki } from './sites/Viki';

export class DoramaSearch {
  public static async unifiedSearch(query: string) {
    const providers: IProvider[] = [
      DoramasMP4,
      Pandrama,
      Viki
    ];

    const results = await Promise.allSettled(providers.map((provider) => provider.search(query)));

    return results.map((result, index) => ({
      ...result,
      provider: providers[index].name,
      isPaid: providers[index].isPaid
    }));
  }
}

export interface IProvider {
  name: string;
  isPaid: boolean;
  search: (query: string) => Promise<ISearchResult[]>;
}

export interface ISearchResult {
	title: string;
	url: string;
}
