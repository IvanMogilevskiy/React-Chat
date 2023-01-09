import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import useSocket from '../../hooks/useSocket.jsx';
import { selectors, setCurrentChannel } from '../../slices/channelsSlice.js';
import { hideModal } from '../../slices/modalsSlice.js';

const Add = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { addNewChannel } = useSocket();
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll);
  const names = channels.map((channel) => channel.name);

  const handleResponse = (response) => {
    if (response.status === 'ok') {
      dispatch(setCurrentChannel(response.data.id));
      dispatch(hideModal());
    } else {
      console.error('something wrong!');
    }
  };

  const formik = useFormik({
    initialValues: { channelName: '' },
    validationSchema: yup.object({
      channelName: yup
        .string()
        .required('Required')
        .notOneOf(names, 'alreadyExist'),
    }),
    onSubmit: (values) => {
      const name = values.channelName;
      addNewChannel({ name }, handleResponse);
    },
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(hideModal())}>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Label className="visually-hidden" htmlFor="channelName">
            Имя канала
          </Form.Label>
          <Form.Control
            id="channelName"
            name="channelName"
            ref={inputRef}
            onChange={formik.handleChange}
            value={formik.values.channelName}
            type="text"
            isInvalid={
              formik.touched.channelName && !!formik.errors.channelName
            }
            disabled={formik.isSubmitting}
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

export default Add;
