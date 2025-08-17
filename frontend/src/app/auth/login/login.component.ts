import { Component,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators , AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterModule, ReactiveFormsModule, ErrorDialogComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  errorMessage: string = '';
  showErrorDialog: boolean = false;
  errorDialogMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    console.log("LoginComponent.constructor()");
    this.loginForm = this.fb.group({
      //email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
     });
  }

  onSubmit() {
    console.log("LoginComponent.onSubmit(value)", this.loginForm.value);
    console.log("LoginComponent.onSubmit(valid)", this.loginForm.valid);
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: () => {
          console.log("Login successful");
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorMessage = err.error.message + " - Status(" + err.status + ") : " + err.statusText || 'Error de inicio de sesión';
          this.openErrorDialog(this.errorMessage);
          console.error('LoginComponent.onSubmit(error)', err);
        }
      });
    }
  }

  openErrorDialog(message: string) {
    this.errorDialogMessage = message;
    this.showErrorDialog = true;
    console.log("LoginComponent.openErrorDialog()", message);
  }

  closeErrorDialog() {
    this.showErrorDialog = false;
    console.log("LoginComponent.closeErrorDialog()");
  }

  ngOnDestroy() {
    console.log("LoginComponent.ngOnDestroy()");
    // Aquí puedes limpiar recursos si es necesario
  } 
}
