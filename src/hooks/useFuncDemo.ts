import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCurrentUser } from '@/features/userSlice';
import { removeFromStorage } from '@/api';

export default function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return () => {
    dispatch(clearCurrentUser());
    removeFromStorage('token', 'SESSION');
    navigate('/');
  };
}
