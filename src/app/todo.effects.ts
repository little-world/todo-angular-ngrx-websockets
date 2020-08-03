import {map, mergeMap, tap} from "rxjs/operators";
import {loadActionSuccess, requestAddAction, requestDeleteAction, requestLoadAction} from "./todo.actions";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {Todo} from "./todo";
import {TodoRestService} from "./todo-rest.service";
import {TodoWebsocketService} from "./todo-websocket.service";

@Injectable()
export class ToDoEffects {

  constructor(
    private todoServiceWs: TodoWebsocketService,
    private todoService: TodoRestService,
    private action$: Actions) {}

  loadTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(requestLoadAction),
      mergeMap(action =>
        this.todoService.load()
          .pipe(
            map((data: Todo[]) =>
              loadActionSuccess({todos: data})
      )))))

  addTodoWs$ = createEffect(() =>
    this.action$.pipe(
      ofType(requestAddAction),
      tap(action =>
        this.todoServiceWs.add(action.todo)
      )
    ),
   { dispatch: false }
  )

  deleteTodoWs$ = createEffect(() =>
      this.action$.pipe(
        ofType(requestDeleteAction),
        tap(action =>
          this.todoServiceWs.delete(action.id)
        )
      ),
    { dispatch: false }
  )


}


