import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Dropdown, Nav } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { setCurrentChannel } from '../../slices/channelsSlice.js';
import { openModal } from '../../slices/modalsSlice.js';

const Channel = ({ channel, currentChannelId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id, name, removable } = channel;
  const buttonVariant = id === currentChannelId ? 'secondary' : 'light';
  const setChannel = () => dispatch(setCurrentChannel(id));
  const removeChannel = () => dispatch(openModal({ type: 'removing', item: channel }));
  const renameChannel = () => dispatch(openModal({ type: 'renaming', item: channel }));

  return (
    <Nav.Item as="li" key={id} className="w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          onClick={setChannel}
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
                onClick={removeChannel}
              >
                {t('channels.remove')}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={renameChannel}
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

export default Channel;
