import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenGuardService implements CanActivate {

  constructor(private _router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    let token = localStorage.getItem("Token");
    if(token){
      this._router.navigateByUrl('/dashboard')
      return false
    }else {
      return true;
    }
  }
}
