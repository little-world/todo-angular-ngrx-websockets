import {Action, createAction, props} from '@ngrx/store';
import {Todo} from "./todo";

export const requestAddAction = createAction(
  '[Todo Component] Add',
  props<{todo: Todo}>()
);
export const addActionSuccess = createAction(
  '[Todo Component] AddSuccess',
  props<{todo: Todo}>()
);

export const requestDeleteAction = createAction(
  '[Todo Component] Delete',
  props<{id: number}>()
  );
export const deleteActionSuccess = createAction(
  '[Todo Component] DeleteSuccess',
  props<{id: number}>()
);

export const requestLoadAction = createAction(
  '[Todo Component] Load'
);
export const loadActionSuccess = createAction(
  '[Todo Component] LoadSuccess',
  props<{todos: Todo[]}>()
);
