import { useSelector } from 'react-redux';
import getModal from './modals/getModal';

const Modal = () => {
  const modalType = useSelector((state) => state.modals.type);

  if (!modalType) {
    return null;
  }
  const Component = getModal(modalType);

  return <Component />;
};

export default Modal;
