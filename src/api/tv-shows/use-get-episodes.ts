import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {axiosAuth} from '../../lib/axios';

type ResponseType = {
  air_date: string;
  episode_number: number;
  vote_average: number;
  still_path: string;
};

export const useGetEpisodes = (id: number, season: number) => {
  const query = useQuery<ResponseType[]>({
    queryKey: ['tv-show-episodes', id],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/tv/${id}/season/${season}?language=en-IN`,
      );

      return response.data.episodes;
    },
  });

  return query;
};
