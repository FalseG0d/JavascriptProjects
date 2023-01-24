import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  localItem: any;
  data: any;

  constructor() {
    
  }

  ngOnInit() {
    this.localItem = localStorage.getItem("data");

    if(this.localItem == null) {
      this.data = "";
    }else {
      this.data = JSON.parse(JSON.parse(this.localItem));
    }

    // for(let student of this.data) {
    //   console.log(student);
    // }
  }

}
