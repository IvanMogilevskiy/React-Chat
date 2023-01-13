import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
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
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelArea />
        <MessageArea />
      </Row>
    </Container>
  );
};

export default MainPage;
