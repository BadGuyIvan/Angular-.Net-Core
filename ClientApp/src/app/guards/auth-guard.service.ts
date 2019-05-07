import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _router: Router) { }

  b64DecodeUnicode = str =>
    decodeURIComponent(
      Array.prototype.map.call(atob(str), c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''))

  parseJwt = token =>
    JSON.parse(
      this.b64DecodeUnicode(
        token.split('.')[1].replace('-', '+').replace('_', '/')
      )
    )

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    let token = localStorage.getItem("Token")
    let now = Date.now()
    if (token) {
      //the *1000 part is here because in JS main time unit is millisecond)
      let expired = this.parseJwt(token).exp * 1000;

      if (expired > now) {
        return true
      } else {
        this._router.navigate(['']);
        localStorage.clear();
        return false;
      }
    } else {
      this._router.navigate(['']);
      return false;
    }
  }
}
