import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class checkingGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
    const userId = route.params['id'];
    
    if (isNaN(userId) || userId < 1 || userId > 99) {
      this.router.navigateByUrl('/user');
      return false;
    } else {
      return true;
    }
}
}