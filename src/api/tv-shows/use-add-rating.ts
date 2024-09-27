import {useMutation, useQueryClient} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {axiosAuth} from '../../lib/axios';

export const useAddRating = (session_id: string | null, tv_id: number) => {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: async (value: number) => {
      const response = await axiosAuth.post(
        `${ENV.apiUrl}/tv/${tv_id}/rating?session_id=${session_id}`,
        {value},
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tv-account-state', 'rated-tv-show'],
      });
    },
  });

  return query;
};
