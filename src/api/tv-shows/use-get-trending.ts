import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {TvShow} from '../../../types';
import {axiosAuth} from '../../lib/axios';

export const useGetTrending = () => {
  const query = useQuery<TvShow[]>({
    queryKey: ['trending-tv-shows'],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/trending/tv/day?language=en-IN`,
      );

      return response.data.results;
    },
  });

  return query;
};
