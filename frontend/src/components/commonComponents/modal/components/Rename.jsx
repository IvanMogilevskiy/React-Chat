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
import useApi from '../../../api/useApi.jsx';
import { selectChannels } from '../../../../slices/channelsSlice.js';
import { hideModal, selectModal } from '../../../../slices/modalsSlice.js';

const Rename = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { renameCurrentChannel } = useApi();
  const channels = useSelector(selectChannels);
  const { item } = useSelector(selectModal);
  const currentChannel = item;
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
        .required('rename.required')
        .notOneOf(names, 'rename.alreadyExists')
        .max(20, 'rename.channelNameLength'),
    }),
    onSubmit: async (values) => {
      const name = filter.clean(values.channelName);
      await renameCurrentChannel(
        {
          id: currentChannel.id,
          name,
        },
        handleResponse,
      );
    },
  });
  const hide = () => dispatch(hideModal());

  return (
    <>
      <Modal.Header closeButton onHide={hide}>
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
              {formik.errors.channelName ? t(formik.errors.channelName) : null}
            </Form.Control.Feedback>
          </FloatingLabel>
          <div className="d-flex justify-content-end mt-3">
            <Button
              type="button"
              className="me-2"
              variant="secondary"
              onClick={hide}
            >
              {t('rename.cancelButton')}
            </Button>
            <Button type="submit" variant="primary" disabled={formik.isSubmitting}>
              {t('rename.submitButton')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

export default Rename;
