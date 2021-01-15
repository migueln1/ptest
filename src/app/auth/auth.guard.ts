import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(
    public authService: AuthService,
    public router: Router
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authService.userLogged.then(user=>{
      if(user===null){
        window.alert('Access Denied, Login is Required to Access This Page!')
        this.router.navigate(['sign-in'])
      }
    })
      // if(this.authService.isLoggedIn.loggedIn !== true) {
      //   window.alert('Access Denied, Login is Required to Access This Page!')
      //   this.router.navigate(['sign-in'])
      // }
      return true;
  }
  
}
