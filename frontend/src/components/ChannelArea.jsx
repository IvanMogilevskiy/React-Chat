/* eslint-disable-next-line */
import { Button, Dropdown, ButtonGroup, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel, selectors } from '../slices/channelsSlice.js';
import { openModal } from '../slices/modalsSlice.js';
import Modal from './Modal.jsx';

const Channel = ({ channel, currentChannelId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id, name, removable } = channel;
  const buttonVariant = id === currentChannelId && 'secondary';

  return (
    <Nav.Item as="li" key={id} className="w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          onClick={() => dispatch(setCurrentChannel(id))}
          className="w-100 rounded-0 text-start text-truncate"
          variant={buttonVariant}
        >
          <span className="me-1">{`# ${name}`}</span>
        </Button>
        {removable ? (
          <>
            <Dropdown.Toggle
              aria-expanded="false"
              className="flex-grow-0"
              variant={buttonVariant}
            >
              <span className="visually-hidden">{t('channels.control')}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  dispatch(
                    openModal({
                      type: 'removing',
                      item: channel,
                    }),
                  );
                }}
              >
                {t('channels.remove')}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  dispatch(
                    openModal({
                      type: 'renaming',
                      item: channel,
                    }),
                  );
                }}
              >
                {t('channels.rename')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </>
        ) : null}
      </Dropdown>
    </Nav.Item>
  );
};

const ChannelArea = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll);

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.channels')}</span>
        <Button
          className="p-0 text-primary btn-group-vertical"
          onClick={() => {
            dispatch(
              openModal({
                type: 'adding',
                item: null,
              }),
            );
          }}
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
      <Nav className="flex-column px-2" as="ul" fill variant="pills">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            currentChannelId={channels.currentChannelId}
          />
        ))}
      </Nav>
      <Modal />
    </div>
  );
};

export default ChannelArea;
