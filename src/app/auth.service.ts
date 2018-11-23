import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url = "http://localhost:3000/api/"

  constructor(private http: HttpClient) { }

  loggedIn(){
    return !!localStorage.getItem('hotelToken')
  }

  getToken(){
    return localStorage.getItem('hotelToken')
  }

  login(data){
    return this.http.post<any>(this.url + 'login', data)
  }

  register(data){
    return this.http.post<any>(this.url + 'add', data)
  }

  get(){
    return this.http.get<any>(this.url + 'getall')
  }

  delete(id){
    return this.http.delete<any>(this.url + `${id}/delete`, httpOptions)
  }
}
