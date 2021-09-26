import { HttpClient } from '@angular/common/http';
import {  Component, OnInit } from '@angular/core';
import { CrudOperationService } from '../crud-operation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private url = 'api/mgmtList';
  private itemurl = 'api/items';
  mgmtList : any;
  items : any;
  constructor(private http: HttpClient,private crud: CrudOperationService) { }

  ngOnInit(): void {
     this.crud.getMgmtList().subscribe(
       (data) => {
        this.mgmtList = data;
       }
     );
  }
  deleteList(id : number){
    this.crud.deleteList(id).subscribe(
      (data) => {
        console.log("After delete list : "+ data);
        this.mgmtList = data;
      }
    )
  }
  getUpdatedMgmtList(data:any[]){
     this.mgmtList = data;
  }
  drop(ev,id:number) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let item = JSON.parse(ev.dataTransfer.getData("item"));
    ev.target.getElementsByClassName('container-child')[0].appendChild(document.getElementById(data));
    item.fkey = +id;
    this.crud.deleteItem(item.id).subscribe(
      (data) => {
        console.log("After delete Item : "+ data);
      }
    );
    this.crud.addItem(item).subscribe(
      (data) => {
        console.log("After delete Item : "+ data);
      },
      (err) => {
        console.error(err);
      }
    );
    this.crud.getMgmtList().subscribe(
      (data) => {
       this.mgmtList = data;
      }
    );
  }
  allowDrop(ev) {
    ev.preventDefault();
  }
}
