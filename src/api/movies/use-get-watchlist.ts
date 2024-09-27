import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {Movie} from '../../../types';
import {axiosAuth} from '../../lib/axios';

export const useGetWatchlist = (session_id: string | null) => {
  const query = useQuery<Movie[]>({
    queryKey: ['watchlist-movies'],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/account/21503347/watchlist/movies?language=en-IN&page=1&session_id=${session_id}`,
      );

      return response.data.results;
    },
  });

  return query;
};
