import { ChangeEvent, FormEvent, useState } from 'react';
import { SubmitBtn } from './submit-btn';

export type LoginEvent = (psot: { user: string; password: string }) => void;
export const LoginForm = ({ onSubmit }: { onSubmit: LoginEvent }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({ user, password });
  };

  return (
    <form className="center" onSubmit={(event: FormEvent) => submit(event)}>
      <h2>Please Sign In</h2>
      <input
        placeholder="UserName"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setUser(event.target.value)
        }
      />
      <input
        type="password"
        placeholder="PassWord"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setPassword(event.target.value)
        }
      />
      <SubmitBtn />
    </form>
  );
};
