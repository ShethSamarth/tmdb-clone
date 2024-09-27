import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {Movie} from '../../../types';
import {axiosAuth} from '../../lib/axios';

type ResponseType = {
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: Movie[];
};

export const useGetCollection = (id: number) => {
  const query = useQuery<ResponseType>({
    queryKey: ['movie-collection', id],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/collection/${id}?language=en-IN`,
      );

      return response.data;
    },
  });

  return query;
};
