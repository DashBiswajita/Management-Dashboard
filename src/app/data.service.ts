import { Injectable } from '@angular/core';
import { InMemoryDbService, STATUS } from 'angular-in-memory-web-api';
import { RequestInfo, ResponseOptions } from 'angular-in-memory-web-api/interfaces';
import { Item } from './item';
import { Lists } from './lists';

@Injectable({
  providedIn: 'root'
})

export class DataService implements InMemoryDbService {

  // In-Memory DB will intercept /api/whatever calls and return data
  createDb() {
    let mgmtList : Lists[] = [
      { 
        id: 1,
        title: "Teams",
        desc: "About Teams",
        creationTime : new Date() 
      },
      { 
        id: 2,
        title: "Products",
        desc: "About Products",
        creationTime : new Date()
      }
    ]
    let items : Item[] =[
      {
        id: 1,
        fkey : 1,
        title : "Product",
        desc : "Pending Tasks needs to be submitted in the given time.",
        creationTime : new Date(),
      },
      {
        id: 2,
        fkey: 1,
        title : "sales",
        desc : "Sending of proposal for new product selling.",
        creationTime : new Date(),
      }
    ]
    return { mgmtList,items } // add as many end-points you want
  }
  put(requestInfo : RequestInfo){
    const collectionName = requestInfo.collectionName;
    const data = requestInfo.utils.getJsonBody(requestInfo.req);
    const collection = requestInfo.collection;
    data.id = collection.map(item => item.id).reduce((cur, next) => cur > next ? cur : next) + 1;
    collection.push(data);
    // forge the response
    const options: ResponseOptions = {
      body: { data  },
      status: STATUS.OK,
      headers: requestInfo.headers,
      url: requestInfo.url
    };

    // use createResponse$ to return proper response
    return requestInfo.utils.createResponse$(() => options);
  
  }
 
}