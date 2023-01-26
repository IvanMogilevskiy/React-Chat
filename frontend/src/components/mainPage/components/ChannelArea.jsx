import { Nav, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectChannels } from '../../../slices/channelsSlice.js';
import { openModal } from '../../../slices/modalsSlice.js';
import Modal from '../../commonComponents/modal/Modal.jsx';
import Channel from './Channel.jsx';

const ChannelArea = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(selectChannels);
  const addChannel = () => dispatch(openModal({ type: 'adding', item: null }));

  return (
    <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.channels')}</span>
        <Button
          className="p-0 text-primary btn-group-vertical"
          variant="null"
          onClick={addChannel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav className="d-flex flex-column px-2" as="ul" fill variant="pills">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            currentChannelId={channels.currentChannelId}
          />
        ))}
      </Nav>
      <Modal />
    </Col>
  );
};

export default ChannelArea;
