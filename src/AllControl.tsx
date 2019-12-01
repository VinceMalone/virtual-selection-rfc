import * as React from 'react';

import { Checkbox } from './Checkbox';
import { toggleAll, useSelection } from './selection';

export interface AllControlProps {
  children?: React.ReactNode;
}

export const AllControl: React.FC<AllControlProps> = ({ children }) => {
  const { dispatch, state } = useSelection();

  const handleChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(toggleAll(evt.target.checked));
    },
    [dispatch],
  );

  return (
    <label>
      <Checkbox
        checked={state.allSelected}
        disabled={state.totalSize === 0}
        indeterminate={state.indeterminate}
        onChange={handleChange}
      />
      {children}
    </label>
  );
};
