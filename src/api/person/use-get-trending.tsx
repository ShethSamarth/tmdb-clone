import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {People} from '../../../types';
import {axiosAuth} from '../../lib/axios';

export const useGetTrending = () => {
  const query = useQuery<People[]>({
    queryKey: ['trending-people'],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/trending/person/day?language=en-IN`,
      );

      return response.data.results;
    },
  });

  return query;
};
