import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthIntercepter implements HttpInterceptor {

  constructor (private authService: AuthService){}

  //intercepter is a function that will run on any outgoing http request
  //so we can manipulate these outgoing request and attach our token header with it
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const token = this.authService.getToken();

    const authRequest = req.clone({
      headers: req.headers.set('Authorization', token || '1')
    });
    console.log(req);
    return next.handle(authRequest);
  }
}
