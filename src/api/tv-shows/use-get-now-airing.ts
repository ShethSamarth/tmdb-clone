import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {axiosAuth} from '../../lib/axios';
import {TvShow} from '../../../types';

export const useGetNowAiring = () => {
  const query = useQuery<TvShow[]>({
    queryKey: ['now-airing-tv-shows'],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/tv/airing_today?language=en-IN&page=1`,
      );

      return response.data.results;
    },
  });

  return query;
};
