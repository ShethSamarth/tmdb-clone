import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {TvShow} from '../../../types';
import {axiosAuth} from '../../lib/axios';

export const useGetRated = (session_id: string | null) => {
  const query = useQuery<TvShow[]>({
    queryKey: ['rated-tv-show'],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/account/21503347/rated/tv?language=en-IN&page=1&session_id=${session_id}&sort_by=created_at.asc`,
      );

      return response.data.results;
    },
  });

  return query;
};
