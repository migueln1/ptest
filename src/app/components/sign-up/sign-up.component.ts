import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor(public authService:AuthService) { }
  
  credentials:any

  async createUser(): Promise<void> {
    //TODO validar campos
    await this.authService.CreateUser(this.credentials)
  }
}
