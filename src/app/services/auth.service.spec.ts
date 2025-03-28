import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('AuthService', () => {
  let service: AuthService;
  let supabase: SupabaseClient;
  let router: Router;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SupabaseClient, useValue: createClient('test', 'test') },
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: MatSnackBar, useValue: { open: jest.fn() } }
      ]
    });
    service = TestBed.inject(AuthService);
    supabase = TestBed.inject(SupabaseClient);
    router = TestBed.inject(Router);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully', async () => {
    const mockSession = { access_token: 'test-token' };
    jest.spyOn(supabase.auth, 'signInWithPassword').mockResolvedValue({ data: { session: mockSession }, error: null } as any);
    await service.login('test@test.com', 'password');
    expect(localStorage.getItem('access_token')).toBe('test-token');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should handle login error', async () => {
    jest.spyOn(supabase.auth, 'signInWithPassword').mockRejectedValue(new Error('Test error'));
    await service.login('test@test.com', 'password');
    expect(snackBar.open).toHaveBeenCalled();
  });

  it('should logout successfully', async () => {
    jest.spyOn(supabase.auth, 'signOut').mockResolvedValue({ error: null } as any);
    await service.logout();
    expect(localStorage.getItem('access_token')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
