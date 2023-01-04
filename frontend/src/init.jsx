import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, Provider } from 'react-redux';
import App from './components/App.js';
import SocketContext from './contexts/socketContext.jsx';
import store from './slices/index.js';
import { addMessage } from './slices/messagesSlice.js';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from './slices/channelsSlice.js';
import AuthProvider from './components/AuthProvider.js';

const SocketProvider = ({ children, socket }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
    });
    socket.on('removeChannel', (channel) => {
      dispatch(removeChannel(channel.id));
    });
    socket.on('renameChannel', (data) => {
      dispatch(
        renameChannel({
          id: data.id,
          changes: { name: data.name },
        }),
      );
    });
  }, [dispatch, socket]);

  const sendMessage = useCallback(
    (message, handleResponse) => {
      socket.emit('newMessage', message, (response) => {
        handleResponse(response);
      });
    },
    [socket],
  );

  const addNewChannel = useCallback(
    (channel, handleResponse) => {
      socket.emit('newChannel', channel, (response) => {
        handleResponse(response);
      });
    },
    [socket],
  );

  const deleteChannel = useCallback(
    (channel, handleResponse) => {
      socket.emit('removeChannel', channel, (response) => {
        handleResponse(response);
      });
    },
    [socket],
  );

  const renameCh = useCallback(
    (data, handleResponse) => {
      socket.emit('renameChannel', data, (response) => {
        handleResponse(response);
      });
    },
    [socket],
  );

  const memo = useMemo(
    () => ({
      sendMessage,
      addNewChannel,
      deleteChannel,
      renameCh,
    }),
    [sendMessage, addNewChannel, deleteChannel, renameCh],
  );

  return (
    <SocketContext.Provider value={memo}>{children}</SocketContext.Provider>
  );
};

const initChat = (socket) => (
  <Provider store={store}>
    <SocketProvider socket={socket}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SocketProvider>
  </Provider>
);

export default initChat;
