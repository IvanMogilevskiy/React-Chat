import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useAuth from '../hooks/useAuth.jsx';
import { fetchData } from '../slices/chatSlice.js';
import ChannelArea from './ChannelArea.jsx';
import MessageArea from './MessageArea.jsx';

const MainPage = () => {
  const dispatch = useDispatch();
  const { getAuthHeader } = useAuth();
  const header = getAuthHeader();

  useEffect(() => {
    dispatch(fetchData(header));
  }, [dispatch, header]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelArea />
        <MessageArea />
      </div>
    </div>
  );
};

export default MainPage;
