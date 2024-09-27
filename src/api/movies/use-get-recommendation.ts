import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {Movie} from '../../../types';
import {axiosAuth} from '../../lib/axios';

export const useGetRecommendation = (id: number) => {
  const query = useQuery<Movie[]>({
    queryKey: ['movie-recommendation', id],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/movie/${id}/recommendations?language=en-IN&page=1`,
      );

      return response.data.results;
    },
  });

  return query;
};
