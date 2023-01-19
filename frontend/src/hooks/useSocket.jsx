import { useContext } from 'react';
import SocketContext from '../contexts/apiContext';

const useSocket = () => useContext(SocketContext);

export default useSocket;
