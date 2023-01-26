import { Modal as ModalComponent } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectModalType } from '../../../slices/modalsSlice.js';
import getModal from './components/getModal';

const Modal = () => {
  const modalType = useSelector(selectModalType);
  const modalShow = !!useSelector(selectModalType);

  if (!modalType) {
    return null;
  }
  const Component = getModal(modalType);

  return (
    <ModalComponent show={modalShow} centered>
      <Component />
    </ModalComponent>
  );
};

export default Modal;
