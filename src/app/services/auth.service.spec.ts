import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: { navigate: jest.fn() } }
      ]
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle login error', async () => {
    const mockError = new Error('Login failed');
    jest.spyOn(service['supabase'].auth, 'signInWithPassword').mockRejectedValue(mockError);
    
    await expect(service.login('test@example.com', 'password')).rejects.toThrow('Login failed');
  });
});
