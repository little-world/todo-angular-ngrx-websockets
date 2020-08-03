import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Injectable} from '@angular/core';
import {Todo} from "./todo";
import {Store} from "@ngrx/store";
import {addActionSuccess, deleteActionSuccess} from "./todo.actions";

@Injectable({
  providedIn: 'root'
})
export class TodoWebsocketService {
  webSocketEndPoint = 'http://localhost:8080/todows';
  topic = '/topic/add';
  stompClient: any;

  constructor(private store: Store<{ todos: Todo[] }>) {
    this.connect();
  }

  connect() {
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect({}, (frame) => {
      this.stompClient.subscribe('/topic/add', (todo) => {
        this.onAdded(todo);
      });
      this.stompClient.subscribe('/topic/delete', (message) => {
        this.onDeleted(message);
      });
      // this.stompClient.reconnect_delay = 2000;
    }, this.onError);
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }

  onError(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  add(todo) {
    this.stompClient.send('/app/add', {}, JSON.stringify(todo));
  }

  onAdded(todo) {
    this.store.dispatch(
      addActionSuccess({todo: JSON.parse(todo.body)}))
  }

  delete(id: number) {
    this.stompClient.send('/app/delete', {}, id);
  }

  onDeleted(message) {
    this.store.dispatch(
      deleteActionSuccess({id: JSON.parse(message.body)}))
  }
}
