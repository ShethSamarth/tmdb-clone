import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {axiosAuth} from '../../lib/axios';

type ResponseType = {
  link?: string;
  buy?: {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
  }[];
};

export const useGetProviders = (id: number) => {
  const query = useQuery<ResponseType>({
    queryKey: ['movie-providers', id],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/movie/${id}/watch/providers`,
      );

      if (response.data.results.IN) {
        return response.data.results.IN;
      }

      return {};
    },
  });

  return query;
};
