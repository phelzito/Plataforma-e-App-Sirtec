import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <mat-card class="register-card">
      <mat-card-header>
        <mat-card-title>Cadastro</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="registerForm" (ngSubmit)="register()">
          <mat-form-field appearance="outline">
            <mat-label>Nome</mat-label>
            <input matInput formControlName="name" required>
            <mat-error *ngIf="registerForm.get('name')?.hasError('required')">
              Nome é obrigatório
            </mat-error>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" required>
            <mat-error *ngIf="registerForm.get('email')?.hasError('required')">
              Email é obrigatório
            </mat-error>
            <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
              Email inválido
            </mat-error>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Data de Nascimento</mat-label>
            <input matInput type="date" formControlName="birthDate">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Cargo</mat-label>
            <input matInput formControlName="position" required>
            <mat-error *ngIf="registerForm.get('position')?.hasError('required')">
              Cargo é obrigatório
            </mat-error>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Matrícula</mat-label>
            <input matInput formControlName="registration" required>
            <mat-error *ngIf="registerForm.get('registration')?.hasError('required')">
              Matrícula é obrigatória
            </mat-error>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Unidade</mat-label>
            <mat-select formControlName="unit" required>
              <mat-option *ngFor="let location of locations" [value]="location">
                {{ location }}
              </mat-option>
            </mat-select>
            <mat-error *ngIf="registerForm.get('unit')?.hasError('required')">
              Unidade é obrigatória
            </mat-error>
          </mat-form-field>
          <mat-card-actions>
            <button mat-raised-button color="primary" type="submit" [disabled]="registerForm.invalid || isLoading$ | async">
              <span *ngIf="!(isLoading$ | async)">Cadastrar</span>
              <mat-spinner *ngIf="isLoading$ | async" diameter="20"></mat-spinner>
            </button>
          </mat-card-actions>
        </form>
      </mat-card-content>
      <mat-card-footer>
        <p class="login-link">Já tem cadastro? <a (click)="goToLogin()">Clique aqui</a></p>
      </mat-card-footer>
    </mat-card>
  `,
  styles: [`
    .register-card {
      max-width: 500px;
      margin: 2rem auto;
      padding: 2rem;
    }
    .login-link {
      text-align: center;
      margin-top: 1rem;
    }
    mat-spinner {
      margin: 0 auto;
    }
    button {
      min-width: 100px;
    }
  `]
})
export class RegisterComponent {
  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    birthDate: [''],
    position: ['', Validators.required],
    registration: ['', Validators.required],
    unit: ['', Validators.required]
  });

  locations = [
    'São Borja', 'São Leopoldo', 'Fortaleza', 'Barreiras', 'Ibotirama',
    'Luis Eduardo Magalhães', 'Guanambi', 'Bom Jesus da Lapa', 'Brumado',
    'Livramento de Nossa Senhora', 'Vitória da Conquista', 'Jequié',
    'Itapetinga', 'Feira de Santana', 'Serrinha', 'Itaberaba', 'Irecê'
  ];

  isLoading$ = this.authService.isLoading$;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  async register() {
    if (this.registerForm.invalid) {
      this.snackBar.open('Por favor, preencha todos os campos corretamente', 'Fechar', {
        duration: 3000
      });
      return;
    }

    await this.authService.register(this.registerForm.value);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
