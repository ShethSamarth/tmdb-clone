import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {axiosAuth} from '../../lib/axios';

export const useGetUpcoming = () => {
  const query = useQuery({
    queryKey: ['upcoming-movies'],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/movie/upcoming?language=en-IN&page=1&region=IN`,
      );

      return response.data;
    },
  });

  return query;
};
