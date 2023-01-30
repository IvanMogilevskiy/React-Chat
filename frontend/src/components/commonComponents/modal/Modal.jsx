import { Modal as ModalComponent } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectModal } from '../../../slices/modalsSlice.js';
import getModal from './components/getModal';

const Modal = () => {
  const { type } = useSelector(selectModal);
  const modalShow = !!type;

  if (!type) {
    return null;
  }
  const Component = getModal(type);

  return (
    <ModalComponent show={modalShow} centered>
      <Component />
    </ModalComponent>
  );
};

export default Modal;
