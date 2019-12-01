import { Mode } from './Mode';

type Action<T extends string, P = undefined> = P extends undefined
  ? { type: T }
  : { type: T; payload: P };

enum ActionType {
  Toggle = 'TOGGLE',
  ToggleAll = 'TOGGLE_ALL',
}

type ToggleAction = Action<ActionType.Toggle, [unknown, boolean][]>;
type ToggleAllAction = Action<ActionType.ToggleAll, boolean>;

type Actions = ToggleAction | ToggleAllAction;

interface State {
  allSelected: boolean;
  indeterminate: boolean;
  mode: Mode;
  set: Set<unknown>;
  totalSize: number;
}

export const initState = (totalSize: number): State => ({
  allSelected: false,
  indeterminate: false,
  mode: Mode.White,
  set: new Set<unknown>(),
  totalSize,
});

export const toggle = (...items: [unknown, boolean][]): ToggleAction => ({
  type: ActionType.Toggle,
  payload: items,
});

export const toggleAll = (selected: boolean): ToggleAllAction => ({
  type: ActionType.ToggleAll,
  payload: selected,
});

const resolveComputedState = (state: State): State => {
  const isBlackMode = state.mode === Mode.Black;
  const isWhiteMode = state.mode === Mode.White;

  const empty = state.set.size === 0;
  const full = state.set.size === state.totalSize;

  const allSelected = (isBlackMode && empty) || (isWhiteMode && full);
  const noneSelected = (isWhiteMode && empty) || (isBlackMode && full);
  const indeterminate = !allSelected && !noneSelected;

  return {
    ...state,
    allSelected,
    indeterminate,
  };
};

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case ActionType.Toggle: {
      action.payload.forEach(([id, selected]) => {
        if (
          (state.mode === Mode.White && selected) ||
          (state.mode === Mode.Black && !selected)
        ) {
          state.set.add(id);
        } else {
          state.set.delete(id);
        }
      });

      return resolveComputedState(state);
    }

    case ActionType.ToggleAll: {
      return resolveComputedState({
        ...state,
        mode: action.payload ? Mode.Black : Mode.White,
        set: new Set<unknown>(),
      });
    }

    default: {
      throw new Error(
        `action type "${((action as unknown) as any).type}" not found`,
      );
    }
  }
};
