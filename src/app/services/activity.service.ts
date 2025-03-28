import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async logActivity(action: string, details: Record<string, any> = {}) {
    const { data: { user } } = await this.supabase.auth.getUser();
    
    if (!user) return;

    const { error } = await this.supabase
      .from('activity_log')
      .insert({
        user_id: user.id,
        action,
        details: JSON.stringify(details),
        ip_address: '', // Adicionar captura de IP
        user_agent: navigator.userAgent
      });

    if (error) {
      console.error('Erro ao registrar atividade:', error);
    }
  }

  async getRecentActivities(limit = 100) {
    const { data, error } = await this.supabase
      .from('activity_log')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }
}
