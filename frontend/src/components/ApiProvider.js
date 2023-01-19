import filter from 'leo-profanity';
import { useDispatch } from 'react-redux';
import { useEffect, useCallback, useMemo } from 'react';
import { addMessage } from '../slices/messagesSlice.js';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from '../slices/channelsSlice.js';
import ApiContext from '../contexts/apiContext.jsx';

const ApiProvider = ({ children, socket }) => {
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
    <ApiContext.Provider value={memo}>{children}</ApiContext.Provider>
  );
};

export default ApiProvider;
