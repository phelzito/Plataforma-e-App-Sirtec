import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  twoFactorForm: FormGroup;
  showTwoFactor = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.twoFactorForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });

    this.authService.twoFactorRequired$.subscribe(required => {
      this.showTwoFactor = required;
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;
    
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password);
  }

  onVerify() {
    if (this.twoFactorForm.invalid) return;
    
    const { code } = this.twoFactorForm.value;
    this.authService.verifyTwoFactor(code);
  }
}
