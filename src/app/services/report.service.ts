import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private supabase: SupabaseClient;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor(private snackBar: MatSnackBar) {
    this.supabase = createClient(
      process.env['SUPABASE_URL']!,
      process.env['SUPABASE_ANON_KEY']!
    );
  }

  async getEngagementReport(): Promise<any> {
    this.isLoadingSubject.next(true);
    try {
      const { data, error } = await this.supabase
        .from('engagement_reports')
        .select('*');
      if (error) throw error;
      return data || [];
    } catch (error) {
      this.handleError(error, 'Erro ao carregar relatório de engajamento');
      return [];
    } finally {
      this.isLoadingSubject.next(false);
    }
  }

  private handleError(error: any, defaultMessage: string): void {
    const message = error.message || defaultMessage;
    this.snackBar.open(message, 'Fechar', {
      duration: 5000
    });
  }
}
