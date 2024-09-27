import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {axiosAuth} from '../../lib/axios';

type ResponseType = {
  name: string;
  key: string;
  site: string;
  type: string;
};

export const useGetVideos = (id: number) => {
  const query = useQuery<ResponseType[]>({
    queryKey: ['movie-videos', id],
    queryFn: async () => {
      const response = await axiosAuth.get(`${ENV.apiUrl}/movie/${id}/videos`);

      if (response.data.results.length > 0) {
        return response.data.results;
      }

      return [];
    },
  });

  return query;
};