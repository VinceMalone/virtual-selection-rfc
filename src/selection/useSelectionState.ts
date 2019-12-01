import { useCallback, useMemo, useReducer } from 'react';

import { initState, reducer } from './duck';
import { Mode } from './Mode';

export const useSelectionState = (totalSize: number) => {
  const [state, dispatch] = useReducer(reducer, totalSize, initState);

  const has = useCallback(
    (id: unknown) =>
      state.allSelected ||
      (state.mode === Mode.White && state.set.has(id)) ||
      (state.mode === Mode.Black && !state.set.has(id)),
    [state],
  );

  const generateOutput = useCallback(
    () => ({
      mode: state.mode,
      list: Array.from(state.set),
    }),
    [state],
  );

  return useMemo(
    () => ({
      dispatch,
      generateOutput,
      has,
      state,
    }),
    [generateOutput, has, state],
  );
};
