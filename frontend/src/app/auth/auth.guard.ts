import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
    console.log("AuthGuard.constructor()");
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated()) {
      console.log("AuthGuard.canActivate() - User is authenticated");
      return true;
    } else {
      console.log("AuthGuard.canActivate() - User is not authenticated, redirecting to login");
      this.router.navigate(['/login']);
      return false;
    }
  }
}