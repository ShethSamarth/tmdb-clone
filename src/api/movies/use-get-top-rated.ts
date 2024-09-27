import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {axiosAuth} from '../../lib/axios';

export const useGetTopRated = () => {
  const query = useQuery({
    queryKey: ['top-rated-movies'],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/movie/top_rated?language=en-IN&page=1&region=IN`,
      );

      return response.data;
    },
  });

  return query;
};
