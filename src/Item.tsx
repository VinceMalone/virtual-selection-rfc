import * as React from 'react';

import { Checkbox } from './Checkbox';
import { toggle, useSelection } from './selection';

export interface ItemProps {
  id: number;
}

export const Item = ({ id }) => {
  const { dispatch, has } = useSelection();

  const handleChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(toggle([id, evt.target.checked]));
    },
    [dispatch, id],
  );

  return (
    <label>
      <Checkbox checked={has(id)} name={`item-${id}`} onChange={handleChange} />
      <span>ID {id}</span>
    </label>
  );
};
