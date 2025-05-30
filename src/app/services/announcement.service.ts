import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(process.env['VITE_SUPABASE_URL']!, process.env['VITE_SUPABASE_ANON_KEY']!);
  }

  async getAnnouncementsByUnit(unit: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('announcements')
      .select('*')
      .eq('unit', unit);

    if (error) {
      throw error;
    }

    return data;
  }
}
