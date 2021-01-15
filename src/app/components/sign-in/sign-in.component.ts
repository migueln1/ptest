import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SignInCredentials } from './sign-in-credentials.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  
  credentials = new SignInCredentials('','')

  async loginUser(): Promise<void> {

    //TODO validar campos
    await this.authService.AuthLogin(this.credentials)
  }
}
