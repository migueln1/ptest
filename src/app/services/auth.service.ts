import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { SignInCredentials } from '../components/sign-in/sign-in-credentials.model';
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
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));  
      }else{
        localStorage.removeItem('user');
      }
    })
  }


  get userLogged():Promise<firebase.User | null> {
     return this.afAuth.authState.pipe(first()).toPromise();
  }
  
  // async isAdmin() {
  //    const user = await this.userLogged()
  //    if (user) {
  //      const token = await user.getIdTokenResult()
  //      if(token.claims.admin){
  //        console.log('is admin')
  //      }
  //    } else {
       
  //   }
  // }
  // get isLoggedIn(): ILoginStatus {
  //   // const result: ILoginStatus = {loggedIn:false,isAdmin:false}
  //   let isAdmin:boolean = false
  //   let loggedIn:boolean = false
  //   this.userLogged.then(async user => {
  //     if(user){
  //       loggedIn = true
  //       console.log(loggedIn)
  //       const token = await user.getIdTokenResult()
  //       if(token.claims.admin){
  //         isAdmin=true
  //       }
  //     }
  //   }).catch(err=>{
  //     window.alert(err)
  //   })
  //   console.log({loggedIn, isAdmin})
  //   return {loggedIn, isAdmin}
  //   // return (localStorage.getItem('user') !== null) ? true : false;
  // }
  async CreateUser(credentials: any) {
    return this.afAuth.createUserWithEmailAndPassword(credentials.email,credentials.password)
      .then(result=>{
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
    // return this.afAuth.signInWithEmailAndPassword() .signInWithPopup(new firebase.auth.EmailAuthProvider())
    // .then((result)=>{
    //   this.ngZone.run(()=>{
    //     console.log(result)
    //     this.router.navigate(['user-profile'])
    //   })
    // }).catch((error) => {
    //   window.alert(error)
    // })
  }

  async SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

}
