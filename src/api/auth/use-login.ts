import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';
import {useMutation} from '@tanstack/react-query';

import {ENV} from '../../constants';
import {axiosAuth} from '../../lib/axios';

interface ResponseType {
  success: boolean;
  session_id: string;
}

interface RequestType {
  username: string;
  password: string;
}

export const useLogin = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async req => {
      const generateToken = await axiosAuth.get(
        `${ENV.apiUrl}/authentication/token/new`,
      );

      const reqToken = generateToken.data.request_token;

      const validateUser = await axiosAuth.post(
        `${ENV.apiUrl}/authentication/token/validate_with_login`,
        {
          username: req.username,
          password: req.password,
          request_token: reqToken,
        },
      );

      if (!validateUser.data.success) {
        throw new Error('Invalid username or password');
      }

      const response = await axiosAuth.post(
        `${ENV.apiUrl}/authentication/session/new`,
        {request_token: validateUser.data.request_token},
      );

      return response.data;
    },
    onSuccess: () =>
      Toast.show({type: 'success', text1: 'Logged In Successfully'}),
    onError: () => Alert.alert('Error', 'Invalid username or password'),
  });

  return mutation;
};
