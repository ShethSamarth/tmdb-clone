import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {axiosAuth} from '../../lib/axios';

export const useGetGenre = () => {
  const query = useQuery({
    queryKey: ['genre-movies'],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/genre/movie/list?language=en`,
      );

      return response.data;
    },
  });

  return query;
};
