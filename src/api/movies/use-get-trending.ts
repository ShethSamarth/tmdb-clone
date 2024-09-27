import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {axiosAuth} from '../../lib/axios';

export const useGetTrending = () => {
  const query = useQuery({
    queryKey: ['trending-movies'],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/trending/movie/day?language=en-IN`,
      );

      return response.data;
    },
  });

  return query;
};
