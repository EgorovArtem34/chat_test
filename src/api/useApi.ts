import axios from 'axios';

const url = 'https://api.green-api.com';
const createUrl = (method: string, id: string, token: string, receiptId?: string): string => [url, `waInstance${id}`, method, token, receiptId].join('/');

type AuthState = {
  stateInstance: null | string;
};
type RequestBodyType = {
  chatId: string,
  message: string,
};
const useApi = () => {
  const getAccountStatus = async (id: string, token: string) => {
    const createdUrl = createUrl('getStateInstance', id, token);
    const { data }: { data: AuthState } = await axios.get(createdUrl);
    return data.stateInstance;
  };

  const sendMessage = async (chatId: string, message: any, id: string, token: string) => {
    const createdUrl = createUrl('sendMessage', id, token);
    const requestBody: RequestBodyType = {
      chatId,
      message,
    };
    const response = await axios.post(createdUrl, requestBody);
    return response;
  };

  const deleteNotification = async (id: string, token: string, receiptId: string) => {
    const createdUrl = createUrl('deleteNotification', id, token, receiptId);
    const response = await axios.delete(createdUrl);
    return response;
  };

  const receiveNotification = async (id: string, token: string) => {
    try {
      const createdUrl = createUrl('receiveNotification', id, token);
      const response = await axios.get(createdUrl);
      if (!(response.data)) {
        return null;
      }
      const { receiptId } = response.data;
      await deleteNotification(id, token, receiptId);
      return response.data;
    } catch (err) {
      return err;
    }
  };
  return { getAccountStatus, sendMessage, receiveNotification };
};

export default useApi;
