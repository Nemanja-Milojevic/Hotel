import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginData = {
    email: null,
    password: null
  }

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginUser(){
    this.auth.login(this.loginData).subscribe(
      res => {
        this.router.navigate(['/list'])
        localStorage.setItem('hotelToken', res.token)
        console.log(res)
      },
      err => console.log(err)
    )
  }

  logout(){
    this.router.navigate(['/login'])
  }

}
