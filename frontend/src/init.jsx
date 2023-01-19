import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, Provider } from 'react-redux';
import { ToastContainer } from 'react-bootstrap';
import filter from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
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
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  payload: {
    environment: 'production',
  },
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const SocketProvider = ({ children, socket }) => {
  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('en'));

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
    socket.on('renameChannel', (channel) => {
      dispatch(
        renameChannel({
          id: channel.id,
          changes: { name: channel.name },
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

  const renameCurrentChannel = useCallback(
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
      renameCurrentChannel,
    }),
    [sendMessage, addNewChannel, deleteChannel, renameCurrentChannel],
  );

  return (
    <SocketContext.Provider value={memo}>{children}</SocketContext.Provider>
  );
};

const initChat = (socket) => (
  <Provider store={store}>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <SocketProvider socket={socket}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </SocketProvider>
        <ToastContainer />
      </ErrorBoundary>
    </RollbarProvider>
  </Provider>
);

export default initChat;
