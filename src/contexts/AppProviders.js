import React from 'react';
import { AuthProvider } from './AuthContext';
import { IndicatorProvider } from './IndicatorContext';

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <IndicatorProvider>
        {children}
      </IndicatorProvider>
    </AuthProvider>
  );
};

export default AppProviders;
