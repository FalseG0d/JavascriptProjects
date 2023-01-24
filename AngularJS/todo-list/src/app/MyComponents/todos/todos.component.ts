import { Component, OnInit } from '@angular/core';

import {Todo} from '../Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[];
  localItem: any;

  addTodoItem(todo: any): void {
    todo["sno"] = this.todos[this.todos.length-1]["sno"] + 1;

    // console.log(todo);

    this.todos.push(todo);
    this.saveTodos();
  }
  
  deleteTodo(todo: any): void {
    // console.log(todo);
    const index = this.todos.indexOf(todo);

    this.todos.splice(index, 1);
    this.saveTodos();
  }

  completeTodo(todo: any): void {
    // console.log(todo);
    const index = this.todos.indexOf(todo);

    this.todos[index].active = false;
    this.saveTodos();
  }

  saveTodos() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
  
  constructor() {
    this.localItem = localStorage.getItem("todos");

    // console.log(this.localItem);

    if(this.localItem == null) {
      this.todos = []
    }else {
      this.todos = JSON.parse(this.localItem);
    }
    
  }

  ngOnInit(): void {
  }

}
