'use client';

import useModalStroe from '@/shared/store/store';
import LogIn from './modals/LogIn';
import SignUp from './modals/SignUp';
import FindPassword from './modals/FindPassword';

const ModalManager = () => {
  const { currentModal, isModalOpen } = useModalStroe();

  if (!isModalOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        {currentModal === 'login' && <LogIn />}
        {currentModal === 'signup' && <SignUp />}
        {currentModal === 'find-password' && <FindPassword />}
      </div>
    </div>
  );
};
export default ModalManager;
