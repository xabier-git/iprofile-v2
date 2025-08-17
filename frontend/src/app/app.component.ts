import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'frontend';
  username: string = '';

  constructor(private authService: AuthService, private router: Router) {
    console.log("AppComponent.constructor()");
    window.onunload = () => {
      this.authService.logout();
    };
  }

  isAuthenticated(): boolean {
    //console.log("AppComponent.isAuthenticated()");
    if(this.authService.isAuthenticated()) {
      console.log("AppComponent.isAuthenticated() - User is authenticated");
      const token = this.authService.getToken(); // si está autenticado es porque tiene el token
      //if (token) {
      try {
        console.log("AppComponent.isAuthenticated() - Token found", token);
        // Decodifica el token para obtener el nombre de usuario (opcional)
        const payload = JSON.parse(atob(token?.split('.')[1] ?? ''));
        console.log("AppComponent.isAuthenticated() - Payload", payload);
        this.username = payload.username || 'User';
        return true;
      } catch (e) {
          console.error("AppComponent.isAuthenticated() - Error decoding token", e);
        return false;
      }
      //}
      //return false;
    }
    return false;
  }

  logout(): void {
    console.log("AppComponent.logout()");
    this.authService.logout();
    this.router.navigate(['/welcome']);
  }

  ngOnDestroy(): void {
    // Clean up subscriptions or resources here
    console.log("AppComponent.ngOnDestroy()");
  }     
}