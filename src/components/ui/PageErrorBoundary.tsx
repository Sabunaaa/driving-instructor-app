'use client';

import React, { ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';

interface Props {
  children: ReactNode;
  name?: string;
}

/**
 * Wrapped Error Boundary with logging capabilities
 * Logs errors with component context
 */
export const PageErrorBoundary: React.FC<Props> = ({ children, name = 'Page' }) => {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error(`Error in ${name}:`, error);
    console.error(`Component stack for ${name}:`, errorInfo.componentStack);
    
    // You can extend this to integrate with error tracking services
  };

  return (
    <ErrorBoundary onError={handleError}>
      {children}
    </ErrorBoundary>
  );
};

export default PageErrorBoundary;
