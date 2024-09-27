import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {axiosAuth} from '../../lib/axios';
import {TvShowDetails} from '../../../types';

export const useGetTvShow = (id: number) => {
  const query = useQuery<TvShowDetails>({
    queryKey: ['tv-show-details', id],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/tv/${id}?language=en-IN'`,
      );

      return response.data;
    },
  });

  return query;
};
