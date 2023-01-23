import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { Button, Form, Col } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import { selectors as messagesSelectors } from '../../slices/messagesSlice.js';
import useSocket from '../../hooks/useSocket.jsx';

const MessageArea = () => {
  const { t } = useTranslation();
  const inputRef = useRef();

  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );

  useEffect(() => inputRef.current.focus());

  const messages = useSelector(messagesSelectors.selectAll);
  const currentMessages = messages.filter(
    (msg) => msg.channelId === currentChannelId,
  );

  const latestMessageRef = useRef();

  useEffect(() => {
    latestMessageRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  }, [currentMessages]);

  const currentChannel = useSelector((state) => channelsSelectors
    .selectById(state, currentChannelId));
  const username = JSON.parse(localStorage.getItem('username'));
  const { sendMessage } = useSocket();

  const messageCount = currentMessages.length;

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: (values) => {
      const newMessage = {
        message: filter.clean(values.message),
        username,
        channelId: currentChannelId,
      };
      sendMessage(newMessage, (response) => {
        if (response.status === 'ok') {
          formik.resetForm();
        } else {
          toast.error(t('notifications.connectionError'), {
            position: 'top-right',
          });
        }
      });
    },
  });
  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {currentChannel ? currentChannel.name : null}
            </b>
          </p>
          <span className="text-muted">
            {t('messages.messages', { count: messageCount })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {currentMessages.map((msg) => (
            <div className="text-break mb-2" key={msg.id}>
              <b>{msg.username}</b>
              {': '}
              {msg.message}
            </div>
          ))}
          <span ref={latestMessageRef} />
        </div>
        <div className="mt-auto px-5 py-3">
          <Form
            noValidate
            className="py-1 border rounded-2"
            onSubmit={formik.handleSubmit}
          >
            <div className="input-group has-validation">
              <Form.Control
                onChange={formik.handleChange}
                name="message"
                id="message"
                aria-label={t('messages.newMessage')}
                placeholder={t('messages.enterMessage')}
                className="border-0 p-0 ps-2"
                value={formik.values.message}
                ref={inputRef}
                disabled={formik.isSubmitting}
              />
              <Button
                type="submit"
                disabled={formik.values.message === '' || formik.isSubmitting}
                className="btn btn-group-vertical"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    /* eslint-disable-next-line  */
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                  />
                </svg>
                <span className="visually-hidden">{t('messages.send')}</span>
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Col>
  );
};

export default MessageArea;
