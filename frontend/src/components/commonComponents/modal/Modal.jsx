import { useSelector } from 'react-redux';
import { selectModalType } from '../../../slices/modalsSlice.js'; // frontend/src/slices/modalsSlice.js
import getModal from './components/getModal'; // frontend/src/components/commonComponents/modal/Modal.jsx

const Modal = () => {
  const modalType = useSelector(selectModalType);

  if (!modalType) {
    return null;
  }
  const Component = getModal(modalType);

  return <Component />;
};

export default Modal;
