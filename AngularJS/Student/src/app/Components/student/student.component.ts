import { Component, OnInit } from '@angular/core';

import { readFile } from 'fs';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  localItem: any;
  data: any;

  constructor() {
    
  }

  ngOnInit() {
    // localStorage.setItem("data", JSON.stringify(this.JSONData));

    this.localItem = localStorage.getItem("data");

    if(this.localItem == null) {
      this.data = "";
    }else {
      this.data = JSON.parse(this.localItem);
    }

    // console.log(this.data);

    for(let student of this.data) {
      console.log(student);
    }
  }

}

