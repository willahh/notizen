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
  <Button size="small" onClick={onLogin} label="Log in" />
);
