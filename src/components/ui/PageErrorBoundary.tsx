'use client';

import React, { ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { logger } from '@/utils/secureLogger';

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
    logger.error(`Error in ${name}`, { error: error.message, stack: error.stack });
    logger.error(`Component stack for ${name}`, { componentStack: errorInfo.componentStack });
    
    // You can extend this to integrate with error tracking services
  };

  return (
    <ErrorBoundary onError={handleError}>
      {children}
    </ErrorBoundary>
  );
};

export default PageErrorBoundary;
