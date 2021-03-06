import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public users

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.getAll()
    }, 200);
  }

  getAll(){
    this.auth.get().subscribe(
      res => this.users = res,
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.router.navigate(['/login'])
          }
        }
      }
    )
  }

  deleteUser(id){
    this.auth.delete(id).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
    setTimeout(() => {
      this.getAll()
    }, 200);
  }

  logout(){
    localStorage.removeItem('hotelToken')
    this.router.navigate(['/login'])
  }

}
