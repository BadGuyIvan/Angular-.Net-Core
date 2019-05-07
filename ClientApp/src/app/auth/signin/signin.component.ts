import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms"
import { AuthService } from "../service/auth.service";
import { User } from 'models/User';
import { map, tap, switchMapTo, delay, debounceTime, distinctUntilChanged } from 'rxjs/operators';
// import { of, timer } from "rxjs/operator";
import { Observable, of, timer } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {

  signinForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email], this.validateEmailNotTaken.bind(this)],
      password: ['',Validators.required]
    })
  }

  onSubmit() {
    var user: User = this.signinForm.value

    this.auth.SignIn(user).subscribe(
      result => console.log(result),
      error => console.error(error)
    )
  }

  get errors_email() { return this.signinForm.get('email'); }

  validateEmailNotTaken(control: AbstractControl){
    return control.valueChanges.pipe(
      // delay(500),
      debounceTime(500),
      distinctUntilChanged(),
      switchMapTo(this.auth.checkEmailNotTaken(control.value)),
      map((res : Array<String>) => {
       if (res.length === 0) {
         return control.setErrors(null);
       } else {
         return control.setErrors({ emailTaken: 'email already exist' })
       }
      })
    )
  };
}
