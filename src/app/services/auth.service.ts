import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private twoFactorSubject = new BehaviorSubject<boolean>(false);
  private userUnitSubject = new BehaviorSubject<string>('');
  userUnit$ = this.userUnitSubject.asObservable();

  constructor(private router: Router) {
    this.supabase = createClient(process.env['VITE_SUPABASE_URL']!, process.env['VITE_SUPABASE_ANON_KEY']!);
  }

  async login(email: string, password: string): Promise<void> {
    this.isLoadingSubject.next(true);
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        if (error.message.includes('second factor required')) {
          this.twoFactorSubject.next(true);
          return;
        }
        throw error;
      }
      
      this.setToken(data.session?.access_token!);
      const userUnit = data.user?.user_metadata?.unit;
      this.userUnitSubject.next(userUnit);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.handleError(error, 'Erro ao fazer login');
    } finally {
      this.isLoadingSubject.next(false);
    }
  }

  private setToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  private handleError(error: any, message: string) {
    console.error(message, error);
  }

  getUserUnit(): string {
    return this.userUnitSubject.getValue();
  }
}
