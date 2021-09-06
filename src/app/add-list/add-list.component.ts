import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudOperationService } from '../crud-operation.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent implements OnInit {
  constructor(private fb: FormBuilder,private crud : CrudOperationService, private router: Router) { }
  addForm;
  private type;
  private title;
  private desc;
  private fkey;
  private url = 'api/mgmtList'
  ngOnInit(): void {
    this.addForm = this.fb.group({
      type: ['', [Validators.required]],
      fkey : [null,[Validators.required]],
      title: ['', [Validators.required]],
      desc: ''
     })
  }
  onsubmit = function(){
    this.type = this.addForm.get('type').value;
    this.title = this.addForm.get('title').value;
    this.desc = this.addForm.get('desc').value;
    if(this.type === 'LIST'){
      this.crud.addList({type :this.type,title: this.title,desc:this.desc,creationTime: new Date(),items: []}).subscribe(
        (data) => {
          alert("Data Inserted Successfully");
          this.router.navigate(['list']);
        },
        (err) => {
          console.error(err);
        }
      )
    }else if(this.type === 'ITEM'){
        this.fkey = +this.addForm.get('fkey').value;
        this.crud.addItem({type :this.type,fkey: this.fkey,title: this.title,desc:this.desc,creationTime: new Date()}).subscribe(
          (data) => {
            alert("Item Inserted Successfully");
            console.log(data);
            this.router.navigate(['list']);
          },
          (err) => {
            console.error(err);
          }
        )
    }
  }

}
