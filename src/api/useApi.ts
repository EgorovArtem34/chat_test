import axios from 'axios';

const url: string = 'https://api.green-api.com';

const createUrl = (method: string, id: string, token: string, receiptId?: string): string => [url, `waInstance${id}`, method, token, receiptId].join('/');

type authState = {
  stateInstance: null | string;
}
type RequestBodyType = {
  chatId: string,
  message: string,
};
const useApi = () => {

  const getAccountStatus = async (id: string, token: string) => {
    const createdUrl = createUrl('getStateInstance', id, token);
    const { data }: { data: authState } = await axios.get(createdUrl);
    return data.stateInstance;
  };

  const sendMessage = async (chatId: string, message: any, id: string, token: string) => {
    const createdUrl = createUrl('sendMessage', id, token);
    const requestBody: RequestBodyType = {
      chatId: chatId,
      message: message
    }
    const response = await axios.post(createdUrl, requestBody)
    return response;
  };

  const receiveNotification = async (id: string, token: string) => {
    // GET https://api.green-api.com/waInstance{{idInstance}}/receiveNotification/{{apiTokenInstance}}
    try {
      const createdUrl = createUrl('receiveNotification', id, token);
      const response = await axios.get(createdUrl);
      if (!(response.data)) {
        console.log('сработал return', createdUrl);
        return;
      }
      const { receiptId } = response.data;
      const deleteNot = await deleteNotification(id, token, receiptId);
      console.log(deleteNot, 'DELETE');
      return response.data;
    } catch (err) {
      return err;
    }
  }

  const deleteNotification = async (id: string, token: string, receiptId: string) => {
    // DELETE https://api.green-api.com/waInstance{{idInstance}}/deleteNotification/{{apiTokenInstance}}/{{receiptId}}
    const createdUrl = createUrl('deleteNotification', id, token, receiptId);
    const response = await axios.delete(createdUrl);
    return response;
  }

  return { getAccountStatus, sendMessage, receiveNotification };
}

export default useApi;
