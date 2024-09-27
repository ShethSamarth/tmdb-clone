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
    queryKey: ['tv-show-providers', id],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/tv/${id}/watch/providers`,
      );

      if (response.data.results?.US) {
        return response.data.results.US;
      }

      return {};
    },
  });

  return query;
};
