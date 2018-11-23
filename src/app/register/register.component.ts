import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerData = {
    name: null,
    surname: null,
    email: null,
    password: null
  }

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  registerUser(){
    this.auth.register(this.registerData).subscribe(
      res => {
        this.router.navigate(['/list'])
        localStorage.setItem('hotelToken', res.token)
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }

}
