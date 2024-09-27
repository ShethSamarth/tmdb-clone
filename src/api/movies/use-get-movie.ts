import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {axiosAuth} from '../../lib/axios';
import {MovieDetails} from '../../../types';

export const useGetMovie = (id: number) => {
  const query = useQuery<MovieDetails>({
    queryKey: ['movie-details', id],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/movie/${id}?language=en-IN`,
      );

      return response.data;
    },
  });

  return query;
};
