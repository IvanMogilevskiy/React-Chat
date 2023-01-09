import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import useSocket from '../../hooks/useSocket.jsx';
import { hideModal } from '../../slices/modalsSlice.js';

const Remove = () => {
  const dispatch = useDispatch();
  const { deleteChannel } = useSocket();
  const currentChannel = useSelector((state) => state.modals.item);

  const handleResponse = (response) => {
    if (response.status === 'ok') {
      dispatch(hideModal());
    } else {
      console.error('something wrong!!!');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    deleteChannel(currentChannel, handleResponse);
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(hideModal())}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <Form onSubmit={onSubmit}>
          <div className="d-flex justify-content-end">
            <Button
              type="button"
              className="me-2"
              variant="secondary"
              onClick={() => dispatch(hideModal())}
            >
              Отменить
            </Button>
            <Button type="submit" variant="danger">
              Удалить
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
