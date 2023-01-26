import { useMemo } from 'react';
import ApiContext from './apiContext.jsx';
import buildApi from './buildApi.js';

const ApiProvider = ({ socket, children }) => {
  const chatApi = useMemo(() => buildApi(socket), [socket]);

  return (
    <ApiContext.Provider value={chatApi}>{children}</ApiContext.Provider>
  );
};

export default ApiProvider;
