import {catchError, map, mergeMap} from "rxjs/operators";
import {
  addActionSuccess,
  deleteActionSuccess,
  loadActionSuccess,
  requestAddAction,
  requestDeleteAction,
  requestLoadAction
} from "./todo.actions";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {Todo} from "./todo";
import {TodoRestService} from "./todo-rest.service";

@Injectable()
export class ToDoEffects {

  constructor(
    private todoService: TodoRestService,
    private action$: Actions) {
  }

  loadTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(requestLoadAction),
      mergeMap(action =>
        this.todoService.load()
          .pipe(
            map((data: Todo[]) =>
              loadActionSuccess({todos: data})
            )))))

  addTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(requestAddAction),
      mergeMap(action =>
        this.todoService.add(action.todo)
          .pipe(
            map((data: Todo) =>
              addActionSuccess({todo: data})
            )//, catchError(err => addActionFailure({error: err}))
          ))))

  deleteTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(requestDeleteAction),
      mergeMap(action =>
        this.todoService.delete(action.id)
          .pipe(
            map(() =>
              deleteActionSuccess({id: action.id})
            )))))


  // addTodo$    = createEffect(() => ...
  // deleteTodo$ = createEffect(() => ...

}


