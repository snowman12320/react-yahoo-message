import { clearCurrentUser } from '@/features/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromStorage } from '@/api';

export function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return () => {
    dispatch(clearCurrentUser());
    removeFromStorage('token','SESSION');
    navigate('/');
  };
}