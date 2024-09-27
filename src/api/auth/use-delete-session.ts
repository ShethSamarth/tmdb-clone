import {useMutation} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {axiosAuth} from '../../lib/axios';

interface ResponseType {
  success: boolean;
}

interface RequestType {
  session_id: string | null;
}

export const useDeleteSession = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({session_id}) => {
      if (!session_id) {
        return {success: false};
      }

      const response = await axiosAuth.delete(
        `${ENV.apiUrl}/authentication/session`,
        {data: {session_id: session_id}},
      );

      return response.data;
    },
  });

  return mutation;
};
