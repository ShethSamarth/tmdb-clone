import {useMutation} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {axiosAuth} from '../../lib/axios';

interface ResponseType {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
}

export const useGuestSession = () => {
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await axiosAuth.get(
        `${ENV.apiUrl}/authentication/guest_session/new`,
      );
      return response.data;
    },
  });

  return mutation;
};
