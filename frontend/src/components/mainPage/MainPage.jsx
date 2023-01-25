import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useAuth from '../authentication/useAuth.jsx';
import { fetchData, selectChat, selectError } from '../../slices/chatSlice.js';
import ChannelArea from './ChannelArea.jsx';
import MessageArea from './MessageArea.jsx';

const MainPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const auth = useAuth();
  const { getAuthHeader } = useAuth();
  const { status } = useSelector(selectChat);
  const error = useSelector(selectError);

  useEffect(() => {
    const header = getAuthHeader();
    dispatch(fetchData(header));
  }, [dispatch, getAuthHeader]);

  useEffect(() => {
    if (error && error.code === 'ERR_NETWORK') {
      toast.error(t('notifications.connectionError'));
    }
    if (error && error.code === 'ERR_BAD_REQUEST') {
      toast.error(t('notifications.authFailed'));
      auth.logOut();
    }
  }, [error, t, auth]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      {status === 'pending' && (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" role="status" />
        <span className="visually-hidden">{t(MainPage.loading)}</span>
      </div>
      )}
      {status === 'fulfilled' && (
      <Row className="h-100 bg-white flex-md-row">
        <ChannelArea />
        <MessageArea />
      </Row>
      )}
    </Container>
  );
};

export default MainPage;
