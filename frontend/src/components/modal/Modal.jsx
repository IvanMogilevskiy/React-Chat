import { useSelector } from 'react-redux';
import getModal from './components/getModal';

const Modal = () => {
  const modalType = useSelector((state) => state.modals.type);

  if (!modalType) {
    return null;
  }
  const Component = getModal(modalType);

  return <Component />;
};

export default Modal;
