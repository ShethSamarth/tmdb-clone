import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {People} from '../../../types';
import {axiosAuth} from '../../lib/axios';

export const useGetPopular = () => {
  const query = useQuery<People[]>({
    queryKey: ['popular-people'],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/person/popular?language=en-IN&page=1`,
      );

      return response.data.results;
    },
  });

  return query;
};
