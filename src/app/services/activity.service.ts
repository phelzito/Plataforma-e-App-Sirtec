import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(process.env['VITE_SUPABASE_URL']!, process.env['VITE_SUPABASE_ANON_KEY']!);
  }

  async logActivity(userId: string, activityType: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('activities')
      .insert([{ user_id: userId, activity_type: activityType }]);

    if (error) {
      throw error;
    }

    return data;
  }
}
