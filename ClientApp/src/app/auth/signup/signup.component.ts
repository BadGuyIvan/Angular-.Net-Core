import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../service/auth.service";
import { User } from 'models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private route: Router) { }

  onSubmit() {
    let user: User = this.signupForm.value;
    this.auth.SignUp(user).subscribe(
      result => {
        if(result.value) {
          localStorage.setItem('Token',result.value)
        }
        this.route.navigateByUrl('/dashboard');
      },
      error => console.error(error)
      )
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['',Validators.required]
    })
  }

  get errors_email() { return this.signupForm.get('email'); }

}
