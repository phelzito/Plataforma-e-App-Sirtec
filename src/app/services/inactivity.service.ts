import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {
  private inactivityTimer: Subscription;
  private readonly inactivityPeriod = 30 * 60 * 1000; // 30 minutos

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  startInactivityTimer() {
    this.inactivityTimer = interval(this.inactivityPeriod).subscribe(() => {
      this.authService.logout();
      this.router.navigate(['/login']);
    });
  }

  stopInactivityTimer() {
    if (this.inactivityTimer) {
      this.inactivityTimer.unsubscribe();
    }
  }
}
