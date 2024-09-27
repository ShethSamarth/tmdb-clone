import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {TvShow} from '../../../types';
import {axiosAuth} from '../../lib/axios';

export const useGetFavourites = (session_id: string | null) => {
  const query = useQuery<TvShow[]>({
    queryKey: ['favourite-tv-show'],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/account/21503347/favorite/tv?language=en-IN&page=1&session_id=${session_id}&sort_by=created_at.asc`,
      );

      return response.data.results;
    },
  });

  return query;
};
