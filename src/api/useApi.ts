import axios from 'axios';

const url: string = 'https://api.green-api.com';

const createUrl = (method: string, id: string, token: string): string => [url, `waInstance${id}`, method, token].join('/');

type authState = {
  stateInstance: null | string;
}

const useApi = () => {

  const getAccountStatus = async (id: string, token: string) => {
    const createdUrl = createUrl('getStateInstance', id, token);
    const { data }: { data: authState } = await axios.get(createdUrl);
    return data.stateInstance;
  };

  const sendMessage = async (requestBody) => {

  };
  return { getAccountStatus, sendMessage };
}

export default useApi;

