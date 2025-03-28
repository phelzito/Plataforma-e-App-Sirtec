import { TestBed } from '@angular/core/testing';
import { GuestGuard } from './guest.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

describe('GuestGuard', () => {
  let guard: GuestGuard;
  let authService: jest.Mocked<AuthService>;
  let router: jest.Mocked<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { isAuthenticated$: { pipe: jest.fn() } } },
        { provide: Router, useValue: { navigate: jest.fn() } }
      ]
    });
    guard = TestBed.inject(GuestGuard);
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when not authenticated', () => {
    authService.isAuthenticated$.pipe = jest.fn().mockReturnValue(false);
    expect(guard.canActivate()).toBeTruthy();
  });

  it('should redirect to dashboard when authenticated', () => {
    authService.isAuthenticated$.pipe = jest.fn().mockReturnValue(true);
    expect(guard.canActivate()).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
