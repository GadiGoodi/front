import useModalStroe from '@/app/store/store';
import Login from '@/app/(components)/common/modals/LogIn';
import SignUp from '@/app/(components)/common/modals/SignUp';
import FindPassword from '@/app/(components)/common/modals/FindPassword';

const ModalManager = () => {
  const { currentModal, isModalOpen } = useModalStroe();

  if (!isModalOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        {currentModal === 'login' && <Login />}
        {currentModal === 'signup' && <SignUp />}
        {currentModal === 'find-password' && <FindPassword />}
      </div>
    </div>
  );
};
export default ModalManager;
