import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {axiosAuth} from '../../lib/axios';

export const useGetNowPlaying = () => {
  const query = useQuery({
    queryKey: ['now-playing-movies'],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/movie/now_playing?language=en-IN&page=1&region=IN`,
      );

      return response.data.results;
    },
  });

  return query;
};
