import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import {
  Modal, Form, Button, FloatingLabel,
} from 'react-bootstrap';
import * as yup from 'yup';
import useApi from '../../api/useApi.jsx';
import { selectors, setCurrentChannel } from '../../../slices/channelsSlice.js';
import { hideModal } from '../../../slices/modalsSlice.js';

const Add = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { t } = useTranslation();

  const { addNewChannel } = useApi();
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll);
  const names = channels.map((channel) => channel.name);

  const handleResponse = (response) => {
    if (response.status === 'ok') {
      dispatch(setCurrentChannel(response.data.id));
      dispatch(hideModal());
      toast.success(t('notifications.channelCreated'), {
        position: 'top-right',
      });
    } else {
      toast.error(t('notifications.connectionError'), {
        position: 'top-right',
      });
    }
  };

  const formik = useFormik({
    initialValues: { channelName: '' },
    validationSchema: yup.object({
      channelName: yup
        .string()
        .required(t('add.required'))
        .notOneOf(names, t('add.alreadyExists')),
    }),
    onSubmit: (values) => {
      const name = filter.clean(values.channelName);

      addNewChannel({ name }, handleResponse);
    },
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(hideModal())}>
        <Modal.Title>{t('add.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FloatingLabel controlId="channelName" label={t('add.label')}>
            <Form.Control
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
          </FloatingLabel>
          <div className="d-flex justify-content-end mt-3">
            <Button
              type="button"
              className="me-2"
              variant="secondary"
              onClick={() => dispatch(hideModal())}
              disabled={formik.isSubmitting}
            >
              {t('add.cancelButton')}
            </Button>
            <Button type="submit" variant="primary">
              {t('add.submitButton')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
