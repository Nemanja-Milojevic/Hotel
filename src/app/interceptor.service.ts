import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req, next){
    let tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    })
    return next.handle(tokenReq)
  }
}
