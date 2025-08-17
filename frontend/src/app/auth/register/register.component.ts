import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, ErrorDialogComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {
  registerForm: FormGroup;
  errorMessage: string = '';
  showErrorDialog: boolean = false;
  errorDialogMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    console.log("Register.constructor()");
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
     // email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  onSubmit() {
    console.log("Register.onSubmit()", this.registerForm.value);
    if (this.registerForm.valid) {
      
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          alert('Registro exitoso. Ahora puedes iniciar sesión.');
          console.log("Registro exitoso", response);
          this.registerForm.reset();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error("Error de registro", err);
          this.errorMessage =  err.error.message + " - Status(" + err.status + ") :" + err.statusText || 'Error de inicio de sesión';
          this.openErrorDialog(this.errorMessage);
        }
      });
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
      console.log("Register.passwordsMatchValidator()");

      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
  }

  openErrorDialog(message: string) {
    this.errorDialogMessage = message;
    this.showErrorDialog = true;
    console.log("Register.openErrorDialog()", message);
  }

  closeErrorDialog() {
    this.showErrorDialog = false;
    console.log("Register.closeErrorDialog()");
  }

  ngOnDestroy() {
    // Aquí puedes limpiar recursos si es necesario
    console.log("Register.ngOnDestroy()");  
  }
}

