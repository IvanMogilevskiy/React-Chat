import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Button } from 'react-bootstrap';
import useSocket from '../../hooks/useSocket.jsx';
import { hideModal } from '../../slices/modalsSlice.js';

const Remove = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { deleteChannel } = useSocket();
  const currentChannel = useSelector((state) => state.modals.item);

  const handleResponse = (response) => {
    if (response.status === 'ok') {
      dispatch(hideModal());
      toast.success(t('notifications.channelRemoved'), {
        position: 'top-right',
      });
    } else {
      toast.error(t('notifications.connectionError'), {
        position: 'top-right',
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    deleteChannel(currentChannel, handleResponse);
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(hideModal())}>
        <Modal.Title>{t('remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('remove.confirm')}</p>
        <Form onSubmit={onSubmit}>
          <div className="d-flex justify-content-end">
            <Button
              type="button"
              className="me-2"
              variant="secondary"
              onClick={() => dispatch(hideModal())}
            >
              {t('remove.cancel')}
            </Button>
            <Button type="submit" variant="danger">
              {t('remove.submitButton')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
