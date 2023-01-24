import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  title!: string;
  desc!: string;
  status!: boolean;

  @Output() addTodoEvent = new EventEmitter();
  
  onSubmit() {
    const todo = {
      title: this.title,
      desc: this.desc,
      active: this.status,
    };

    this.addTodoEvent.emit(todo);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
