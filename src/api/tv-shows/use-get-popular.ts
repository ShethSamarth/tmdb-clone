import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {TvShow} from '../../../types';
import {axiosAuth} from '../../lib/axios';

export const useGetPopular = () => {
  const query = useQuery<TvShow[]>({
    queryKey: ['popular-tv-shows'],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/tv/popular?language=en-IN&page=1`,
      );

      return response.data.results;
    },
  });

  return query;
};
