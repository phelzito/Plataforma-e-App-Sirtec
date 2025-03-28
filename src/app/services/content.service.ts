import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private supabase: SupabaseClient;
  private announcementsSubject = new BehaviorSubject<any[]>([]);
  private newsSubject = new BehaviorSubject<any[]>([]);
  private documentsSubject = new BehaviorSubject<any[]>([]);

  announcements$ = this.announcementsSubject.asObservable();
  news$ = this.newsSubject.asObservable();
  documents$ = this.documentsSubject.asObservable();

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async loadAnnouncements(page: number, pageSize: number, searchQuery: string = '') {
    const { data, error } = await this.supabase
      .from('announcements')
      .select('*')
      .ilike('title', `%${searchQuery}%`)
      .range((page - 1) * pageSize, page * pageSize - 1)
      .order('created_at', { ascending: false });

    if (error) throw error;
    this.announcementsSubject.next(data || []);
  }

  async loadNews(page: number, pageSize: number, searchQuery: string = '') {
    const { data, error } = await this.supabase
      .from('news')
      .select('*')
      .ilike('title', `%${searchQuery}%`)
      .range((page - 1) * pageSize, page * pageSize - 1)
      .order('created_at', { ascending: false });

    if (error) throw error;
    this.newsSubject.next(data || []);
  }

  async loadDocuments(page: number, pageSize: number, searchQuery: string = '') {
    const { data, error } = await this.supabase
      .from('documents')
      .select('*')
      .ilike('title', `%${searchQuery}%`)
      .range((page - 1) * pageSize, page * pageSize - 1)
      .order('created_at', { ascending: false });

    if (error) throw error;
    this.documentsSubject.next(data || []);
  }
}
