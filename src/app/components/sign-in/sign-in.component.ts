import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SignInCredentials, SignUpData } from './sign-in-credentials.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent {

  constructor(private authService: AuthService) { }
  
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  signUpForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  async loginUser(): Promise<void> {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    await this.authService.AuthLogin({email,password} as SignInCredentials)
  }
  async signupUser(): Promise<void> {
    const name = this.signUpForm.get('name')?.value;
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;
    await this.authService.CreateUser({name, email,password} as SignUpData)
  }
}
