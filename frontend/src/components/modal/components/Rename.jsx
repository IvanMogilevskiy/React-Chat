import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import filter from 'leo-profanity';
import {
  Modal, Form, Button, FloatingLabel,
} from 'react-bootstrap';
import * as yup from 'yup';
import useSocket from '../../../hooks/useSocket.jsx';
import { selectors } from '../../../slices/channelsSlice.js';
import { hideModal } from '../../../slices/modalsSlice.js';

const Rename = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { renameCurrentChannel } = useSocket();
  const channels = useSelector(selectors.selectAll);
  const currentChannel = useSelector((state) => state.modals.item);
  const names = channels.map((channel) => channel.name);

  const handleResponse = (response) => {
    if (response.status === 'ok') {
      dispatch(hideModal());
      toast.success(t('notifications.channelRenamed'), {
        position: 'top-right',
      });
    } else {
      toast.error(t('notifications.connectionError'), {
        position: 'top-right',
      });
    }
  };

  const formik = useFormik({
    initialValues: { channelName: currentChannel.name },
    validationSchema: yup.object({
      channelName: yup
        .string()
        .required(t('rename.required'))
        .notOneOf(names, t('rename.alreadyExists')),
    }),
    onSubmit: (values) => {
      const name = filter.clean(values.channelName);
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
        <Modal.Title>{t('rename.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FloatingLabel controlId="channelName" label={t('rename.label')}>
            <Form.Control
              name="channelName"
              ref={inputRef}
              className="mb-2"
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.channelName && !!formik.errors.channelName
              }
              value={formik.values.channelName}
              type="text"
              disabled={formik.isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.channelName ? formik.errors.channelName : null}
            </Form.Control.Feedback>
          </FloatingLabel>
          <div className="d-flex justify-content-end mt-3">
            <Button
              type="button"
              className="me-2"
              variant="secondary"
              onClick={() => dispatch(hideModal())}
            >
              {t('rename.cancelButton')}
            </Button>
            <Button type="submit" variant="primary" disabled={formik.isSubmitting}>
              {t('rename.submitButton')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
