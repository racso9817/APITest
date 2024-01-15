import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  UrlTree, 
  Router, 
  CanActivate 
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    const token = localStorage.getItem('token');
    const isLoginRoute = state.url.includes('login');

    if (!token && !isLoginRoute) {
      this.router.navigate(['/login']);
      return false;
    } else if (token && isLoginRoute) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
