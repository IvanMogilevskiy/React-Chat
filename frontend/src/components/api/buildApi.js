import store from '../../slices/index.js';
import { addMessage } from '../../slices/messagesSlice.js';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from '../../slices/channelsSlice.js';

const buildApi = (socket) => {
  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
  });
  socket.on('removeChannel', (channel) => {
    store.dispatch(removeChannel(channel.id));
  });
  socket.on('renameChannel', (channel) => {
    store.dispatch(
      renameChannel({
        id: channel.id,
        changes: { name: channel.name },
      }),
    );
  });

  const sendMessage = (message, handleResponse) => {
    socket.emit('newMessage', message, (response) => {
      handleResponse(response);
    });
  };

  const addNewChannel = (channel, handleResponse) => {
    socket.emit('newChannel', channel, (response) => {
      handleResponse(response);
    });
  };

  const deleteChannel = (channel, handleResponse) => {
    socket.emit('removeChannel', channel, (response) => {
      handleResponse(response);
    });
  };

  const renameCurrentChannel = (data, handleResponse) => {
    socket.emit('renameChannel', data, (response) => {
      handleResponse(response);
    });
  };

  return {
    sendMessage,
    addNewChannel,
    deleteChannel,
    renameCurrentChannel,
  };
};

export default buildApi;
