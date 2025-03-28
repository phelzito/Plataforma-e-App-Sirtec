import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Fechar', { duration: 3000 });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Fechar', { duration: 5000 });
  }

  showApiError(error: any): void {
    const message = error.message || 'Erro ao processar a solicitação';
    this.snackBar.open(message, 'Fechar', { duration: 5000 });
  }
}
