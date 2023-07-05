import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { signAtom } from '@web/store/auth';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const [sign] = useAtom(signAtom);
  if (sign === null) {
    navigate('/login');
  }
  return children;
};
