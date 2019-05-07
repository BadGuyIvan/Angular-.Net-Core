import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private _route: Router) { }

  IsTokenExist = () => {
    let token = localStorage.getItem('Token');
    return token === null ? true : false
  }
  SignOut = () => {
    localStorage.clear();
    this._route.navigateByUrl('');
  }
  ngOnInit() {
  }

}
