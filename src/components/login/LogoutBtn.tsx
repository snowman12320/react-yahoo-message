import { LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCurrentUser } from '@/features/userSlice';
import { removeFromStorage } from '@/api';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

interface LogoutBtnProps {
  buttonText: string;
  className?: string;
}

export function LogoutBtn({ buttonText, className }: LogoutBtnProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(clearCurrentUser());
    removeFromStorage('token', 'SESSION');
    navigate('/');
  };

  return (
    <div className="yahoo-btn-cls">
      <Button
        onClick={logout}
        className={cn(
          className,
          'flex bg-transparent p-0 hover:bg-transparent',
          buttonText !== '' && 'space-x-3',
        )}
        type="submit"
      >
        <span>{buttonText}</span>
        <LogOut />
      </Button>
    </div>
  );
}
