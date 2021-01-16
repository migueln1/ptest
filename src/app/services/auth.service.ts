import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { SignInCredentials, SignUpData } from '../components/sign-in/sign-in-credentials.model';
import { first } from 'rxjs/operators';

export interface ILoginStatus{
  loggedIn:boolean;
  isAdmin:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  userData: any;
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.onAuthStateChanged((user) => {
      if(user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));  
      }else{
        localStorage.removeItem('user');
      }
    })
    // this.afAuth.authState.subscribe(user => {
    //   if(user){
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));  
    //   }else{
    //     localStorage.removeItem('user');
    //   }
    // })
  }

  get userLogged():Promise<firebase.User | null> {
     return this.afAuth.authState.pipe(first()).toPromise();
  }
  
  async CreateUser(credentials: SignUpData) {
    return this.afAuth.createUserWithEmailAndPassword(credentials.email,credentials.password)
      .then(result=>{
        if(result.user){
          result.user.updateProfile({displayName:credentials.name})
        }
        console.log(result)
      }).catch(err=>{
        console.log(err)
      })
  }
  
  async AuthLogin(credentials: SignInCredentials) {
    return this.afAuth.signInWithEmailAndPassword(credentials.email,credentials.password)
    .then((result)=>{
      this.ngZone.run(()=>{
        localStorage.setItem('user', JSON.stringify(result.user));

        this.router.navigate(['products'])
      })
    }).catch((err)=>{
      window.alert(err)
    })
    
  }

  async SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

}
