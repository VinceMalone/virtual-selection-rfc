import * as React from 'react';

import { useSelectionState } from './useSelectionState';

// TODO: type this
const SelectionContext = React.createContext(null);

export const useSelection = () => React.useContext(SelectionContext);

interface SelectionProviderProps {
  children?: React.ReactNode;
  totalSize: number;
}

export const SelectionProvider: React.FC<SelectionProviderProps> = ({
  children,
  totalSize,
}) => {
  const contextValue = useSelectionState(totalSize);

  return (
    <SelectionContext.Provider value={contextValue}>
      {children}
    </SelectionContext.Provider>
  );
};
