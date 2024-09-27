import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {States} from '../../../types';
import {axiosAuth} from '../../lib/axios';

export const useGetState = (movie_id: number, session_id: string) => {
  const query = useQuery<States>({
    queryKey: ['movie-account-state', movie_id, session_id],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/movie/${movie_id}/account_states?session_id=${session_id}`,
      );

      return response.data;
    },
  });

  return query;
};
