import {useMutation, useQueryClient} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {axiosAuth} from '../../lib/axios';

export const useAddRating = (session_id: string | null, movie_id: number) => {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: async (value: number) => {
      const response = await axiosAuth.post(
        `${ENV.apiUrl}/movie/${movie_id}/rating?session_id=${session_id}`,
        {value},
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['movie-account-state', 'rated-movies'],
      });
    },
  });

  return query;
};
