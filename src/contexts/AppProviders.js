import React from 'react';
import { AuthProvider } from './AuthContext';

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export default AppProviders;
