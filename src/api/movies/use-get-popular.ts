import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {axiosAuth} from '../../lib/axios';

export const useGetPopular = () => {
  const query = useQuery({
    queryKey: ['popular-movies'],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/movie/popular?language=en-IN&page=1&region=IN`,
      );

      return response.data;
    },
  });

  return query;
};
