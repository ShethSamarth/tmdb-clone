import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {Movie} from '../../../types';
import {axiosAuth} from '../../lib/axios';

export const useGetRated = (session_id: string | null) => {
  const query = useQuery<Movie[]>({
    queryKey: ['rated-movies'],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/account/21503347/rated/movies?language=en-IN&page=1&session_id=${session_id}&sort_by=created_at.asc`,
      );

      return response.data.results;
    },
  });

  return query;
};
