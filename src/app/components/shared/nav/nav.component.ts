import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  userLogged: boolean = false;
  name: string = '';

  constructor(public afAuth: AngularFireAuth,
    public authService: AuthService) {
    this.afAuth.authState.subscribe((user)=>{
      if(user){
        this.userLogged = true;
        const {displayName, email} = user
        this.name = (displayName ?? email) ?? 'Usuario'
      }else{
        this.userLogged = false;
        this.name = ''
      }
    })
   }

  async logoutUser(): Promise<void> {
    await this.authService.SignOut().then(result=>{
      this.userLogged = false
    });
  }
}
