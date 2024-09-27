import {useQuery} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {Person} from '../../../types';
import {axiosAuth} from '../../lib/axios';

export const useGetDetails = (id: number) => {
  const query = useQuery<Person>({
    queryKey: ['person-details', id],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/person/${id}?append_to_response=combined_credits&language=en-IN`,
      );

      return response.data;
    },
  });

  return query;
};
