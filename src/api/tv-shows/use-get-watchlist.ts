import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {TvShow} from '../../../types';
import {axiosAuth} from '../../lib/axios';

export const useGetWatchlist = (session_id: string | null) => {
  const query = useQuery<TvShow[]>({
    queryKey: ['watchlist-tv-show'],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/account/21503347/watchlist/tv?language=en-IN&page=1&session_id=${session_id}`,
      );

      return response.data.results;
    },
  });

  return query;
};
