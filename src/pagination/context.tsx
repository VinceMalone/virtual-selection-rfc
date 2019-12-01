import * as React from 'react';

import { usePaginationState } from './usePaginationState';

// TODO: type this
const PaginationContext = React.createContext(null);

export const usePagination = () => React.useContext(PaginationContext);

interface PaginationProviderProps {
  children?: React.ReactNode;
  pageSize: number;
  source: unknown[];
}

export const PaginationProvider: React.FC<PaginationProviderProps> = ({
  children,
  pageSize,
  source,
}) => {
  const contextValue = usePaginationState(source, pageSize);

  return (
    <PaginationContext.Provider value={contextValue}>
      {children}
    </PaginationContext.Provider>
  );
};
