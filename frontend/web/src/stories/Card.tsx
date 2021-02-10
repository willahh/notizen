import React from 'react';

import { Button } from './Button';
import './header.css';

export interface CardProps {
  user?: {};
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

export const Card: React.FC<CardProps> = ({
  user,
  onLogin,
  onLogout,
  onCreateAccount,
}) => (
  <header>
    <div>
      {user ? (
        <Button size="small" onClick={onLogout} label="Log out" />
      ) : (
        <>
          <Button size="small" onClick={onLogin} label="Log in" />
          <Button
            primary
            size="small"
            onClick={onCreateAccount}
            label="Sign up"
          />
        </>
      )}
    </div>
  </header>
);
