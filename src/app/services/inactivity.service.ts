import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Subject, Subscription, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {
  private timeout = 300;
  private timeoutSubscription: Subscription;
  private timer$ = timer(this.timeout * 1000);
  private unsubscribe$ = new Subject();

  constructor(private authService: AuthService, private router: Router) {}

  start() {
    this.timeoutSubscription = this.timer$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.authService.logout();
        this.router.navigate(['/login']);
      });
  }

  reset() {
    if (this.timeoutSubscription) {
      this.timeoutSubscription.unsubscribe();
    }
    this.start();
  }

  stop() {
    if (this.timeoutSubscription) {
      this.timeoutSubscription.unsubscribe();
    }
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
