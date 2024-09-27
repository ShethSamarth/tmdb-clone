import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {axiosAuth} from '../../lib/axios';

export const useDetails = (session_id: string | null) => {
  const query = useQuery({
    enabled: !!session_id,
    queryKey: ['details', {session_id}],
    queryFn: async () => {
      if (session_id === null || !session_id) {
        return {
          name: 'Sunshine',
          include_adult: false,
          username: 'Sunshine',
        };
      }

      const response = await axiosAuth.get(
        `${ENV.apiUrl}/account/21503347?session_id=${session_id}`,
      );

      return response.data;
    },
  });

  return query;
};
