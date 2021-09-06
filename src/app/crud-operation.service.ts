import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { Item } from './item';

import { Lists } from './lists';

@Injectable({
  providedIn: 'root'
})
export class CrudOperationService {
  private url = 'api/mgmtList';
  private itemUrl = 'api/items';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }
  getLists(): Observable<Lists[]> {
    return this.http.get<Lists[]>(this.url)
  }
  addList(list: Lists): Observable<Lists> {
    return this.http.put<Lists>(this.url,list,this.httpOptions);
  }
  getMgmtList():Observable<any[]> {
    let mgmtList;
    let items;
       return forkJoin([this.http.get(this.url), this.http.get(this.itemUrl)]).pipe(map(results => {
          mgmtList = results[0];
          items = results[1];
          mgmtList.forEach(element => {
            element.items = [];
            element.items.push(...items.filter(item => item.fkey === element.id).sort((a,b) => Date.parse(a.creationTime) - Date.parse(b.creationTime)));
          });
          return (mgmtList);
        }));
       
  }
  addItem(item: Item): Observable<Item> {
    return this.http.put<Item>(this.itemUrl,item,this.httpOptions);
  }
  deleteItem(id:number): Observable<any> {
    return  this.deleteOperation(id,"ITEM");;
  }
  deleteList(id:number): Observable<any> {
    return this.deleteOperation(id,"LIST");
      
  }
  deleteOperation = function (id:number,type:string) {
    let mgmtList;
    let items;
    let url;
    if(type === "LIST") url = this.url;
    else if(type === "ITEM") url = this.itemUrl;
    return forkJoin([this.http.delete(url+"/"+id,this.httpOptions),this.http.get(this.url), this.http.get(this.itemUrl)]).pipe(
      map(results => {
        mgmtList = results[1];
        items = results[2];
        mgmtList.forEach(element => {
          element.items = [];
          element.items.push(...items.filter(item => item.fkey === element.id).sort((a,b) => Date.parse(a.creationTime) - Date.parse(b.creationTime)));
        })
        return mgmtList;
      })
    );
    
  }
}
