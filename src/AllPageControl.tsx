import * as React from 'react';

import { Checkbox } from './Checkbox';
import { toggle, useSelection } from './selection';

export interface AllPageControlProps {
  children?: React.ReactNode;
  ids: unknown[];
}

export const AllPageControl: React.FC<AllPageControlProps> = ({
  children,
  ids,
}) => {
  const { dispatch, has } = useSelection();

  const checkedCount = React.useMemo(() => ids.filter(has).length, [has, ids]);
  const checked = checkedCount === ids.length;
  const indeterminate = !checked && checkedCount > 0;

  const handleChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const items = ids.map(id => [id, evt.target.checked] as any);
      dispatch(toggle(...items));
    },
    [dispatch, ids],
  );

  return (
    <label>
      <Checkbox
        checked={checked}
        disabled={ids.length === 0}
        indeterminate={indeterminate}
        onChange={handleChange}
      />
      {children}
    </label>
  );
};
