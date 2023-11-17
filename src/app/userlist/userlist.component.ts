import { Component, OnInit } from '@angular/core';
import { _MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface Users {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  status: string;
  action: string;
  // address: string;
}

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  // dataSource;
  gridList: any [] = [];
  
  constructor(private router: Router){
    const localData = localStorage.getItem('userList');
    if(localData!=null){
       this.gridList = JSON.parse(localData);
      // this.dataSource = JSON.parse(localData);
      // console.log(this.dataSource);
    }
    else {
      this.gridList = []; // check later
    }
  };

  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'phone', 'status', 'address', 'action'];
  
  

  ngOnInit(): void {
    
  }

  OnEdit(phone: string){
    this.router.navigate(['/edituser',phone])
  }

  OnDelete(phone: string){
    const isDelete = confirm("Are you sure you want to delete user?");
    if (isDelete){
      const index = this.gridList.findIndex(m=>m.phone == phone);
      console.log(index);
      this.gridList.splice(index, 1);
    }
  }

}
