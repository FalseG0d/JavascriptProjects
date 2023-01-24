import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {Todo} from '../Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  constructor() { }

  @Input() todo!: Todo;
  @Output() deleteTodoEmitter : EventEmitter<Todo> = new EventEmitter();
  @Output() completeTodoEmitter : EventEmitter<Todo> = new EventEmitter();

  ngOnInit(): void {
  }

  deleteTodo(todo: Todo) {
    // console.log(todo);
    this.deleteTodoEmitter.emit(todo);
  }

  completeTodo(todo: Todo) {
    // console.log(todo);
    this.completeTodoEmitter.emit(todo);
  }

}
