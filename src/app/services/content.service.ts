import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(process.env['VITE_SUPABASE_URL']!, process.env['VITE_SUPABASE_ANON_KEY']!);
  }

  async getContentByUnit(unit: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('content')
      .select('*')
      .eq('unit', unit);

    if (error) {
      throw error;
    }

    return data;
  }
}
