import { useMemo } from 'react';
import ApiContext from '../../../contexts/apiContext.jsx';
import buildApi from './buildApi.js';

const ApiProvider = ({ socket, children }) => {
  const {
    sendMessage,
    addNewChannel,
    deleteChannel,
    renameCurrentChannel,
  } = buildApi(socket);

  const memo = useMemo(
    () => ({
      sendMessage,
      addNewChannel,
      deleteChannel,
      renameCurrentChannel,
    }),
    [sendMessage, addNewChannel, deleteChannel, renameCurrentChannel],
  );

  return (
    <ApiContext.Provider value={memo}>{children}</ApiContext.Provider>
  );
};

export default ApiProvider;
