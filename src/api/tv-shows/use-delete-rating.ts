import {useMutation, useQueryClient} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {axiosAuth} from '../../lib/axios';

export const useDeleteRating = (session_id: string | null, tv_id: number) => {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: async () => {
      const response = await axiosAuth.delete(
        `${ENV.apiUrl}/tv/${tv_id}/rating?session_id=${session_id}`,
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tv-account-state'],
      });
    },
  });

  return query;
};
