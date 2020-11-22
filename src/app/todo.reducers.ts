import {createReducer, on} from "@ngrx/store";
import {Todo} from "./todo";
import {addActionSuccess, deleteActionSuccess, loadActionSuccess} from "./todo.actions";


export const initialState: Todo[] = [];

export const todoReducer = createReducer(
  initialState,
  on(addActionSuccess, (state, action) =>
    [...state, action.todo]
  ),
  on(deleteActionSuccess, (state, action) =>
     state.filter(todo => todo.id != action.id)
  ),
  on(loadActionSuccess, (state, action) =>
      action.todos
  ),
);


