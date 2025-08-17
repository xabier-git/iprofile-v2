import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { ProfileAddComponent } from './profile-add/profile-add.component';
import { ProfileListComponent } from './profile-list/profile-list.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profiles/add', component: ProfileAddComponent, canActivate: [AuthGuard] },
  { path: 'profiles', component: ProfileListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];