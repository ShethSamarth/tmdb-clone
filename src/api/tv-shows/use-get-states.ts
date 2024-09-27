import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {States} from '../../../types';
import {axiosAuth} from '../../lib/axios';

export const useGetState = (series_id: number, session_id: string) => {
  const query = useQuery<States>({
    queryKey: ['tv-account-state', series_id, session_id],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/tv/${series_id}/account_states?session_id=${session_id}`,
      );

      return response.data;
    },
  });

  return query;
};
