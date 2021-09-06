import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CrudOperationService } from '../crud-operation.service';
import { Item } from '../item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  private url = 'api/mgmtList';
  private itemurl = 'api/items';
  private listArray : any[]
  constructor(private crud : CrudOperationService,private router: Router, private http: HttpClient) { }
  @Input() items : Item[];
  @Output() mgmtListEvent : EventEmitter<any[]> = new EventEmitter();
  ngOnInit(): void {
    
  }
  deleteItem = function(id: number){
     this.crud.deleteItem(id).subscribe(
      (data) => {
        console.log("After delete Item : "+ data);
        this.listArray = data;
        this.mgmtListEvent.emit(data);
      }
    )
  }
  drag(ev,item){
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("item", JSON.stringify(item));
  }
  
}