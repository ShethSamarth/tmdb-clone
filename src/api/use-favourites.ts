import {useMutation, useQueryClient} from '@tanstack/react-query';

import {ENV} from '../constants';
import {axiosAuth} from '../lib/axios';

type Data = {
  media_type: 'movie' | 'tv';
  media_id: number;
  favorite: boolean;
};

export const useFavourites = (session_id: string | null) => {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: async (data: Data) => {
      const response = await axiosAuth.post(
        `${ENV.apiUrl}/account/21503347/favorite?session_id=${session_id}`,
        data,
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'movie-account-state',
          'tv-account-state',
          'favourite-movies',
          'favourite-tv-show',
        ],
      });
    },
  });

  return query;
};
