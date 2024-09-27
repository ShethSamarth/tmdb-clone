import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {axiosAuth} from '../../lib/axios';
import {Cast, Crew} from '../../../types';

type ResponseType = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};

export const useGetCredits = (id: number) => {
  const query = useQuery<ResponseType>({
    queryKey: ['movie-credits', id],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/movie/${id}/credits?language=en-IN`,
      );

      return response.data;
    },
  });

  return query;
};
