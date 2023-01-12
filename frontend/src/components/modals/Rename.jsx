import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import useSocket from '../../hooks/useSocket.jsx';
import { selectors } from '../../slices/channelsSlice.js';
import { hideModal } from '../../slices/modalsSlice.js';

const Rename = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const dispatch = useDispatch();
  const { renameCurrentChannel } = useSocket();
  const channels = useSelector(selectors.selectAll);
  const currentChannel = useSelector((state) => state.modals.item);
  const names = channels.map((channel) => channel.name);

  const handleResponse = (response) => {
    if (response.status === 'ok') {
      dispatch(hideModal());
    } else {
      console.error('something wrong!!!');
    }
  };

  const formik = useFormik({
    initialValues: { channelName: currentChannel.name },
    validationSchema: yup.object({
      channelName: yup
        .string()
        .required('Required')
        .notOneOf(names, 'AlredyExists'),
    }),
    onSubmit: (values) => {
      const name = values.channelName;
      renameCurrentChannel(
        {
          id: currentChannel.id,
          name,
        },
        handleResponse,
      );
    },
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(hideModal())}>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Label className="visually-hidden" htmlFor="channelName">
            Имя канала
          </Form.Label>
          <Form.Control
            name="channelName"
            id="channelName"
            ref={inputRef}
            className="mb-2"
            onChange={formik.handleChange}
            isInvalid={
              formik.touched.channelName && !!formik.errors.channelName
            }
            value={formik.values.channelName}
            type="text"
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.channelName ? formik.errors.channelName : null}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button
              type="button"
              className="me-2"
              variant="secondary"
              onClick={() => dispatch(hideModal())}
            >
              Отменить
            </Button>
            <Button type="submit" variant="primary">
              Отправить
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
