import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private supabase: SupabaseClient;
  private announcementsSubject = new BehaviorSubject<any[]>([]);

  announcements$ = this.announcementsSubject.asObservable();

  constructor(private snackBar: MatSnackBar) {
    this.supabase = createClient(
      process.env['SUPABASE_URL']!,
      process.env['SUPABASE_ANON_KEY']!
    );
  }

  async loadAnnouncements(page: number = 1, pageSize: number = 10, searchQuery: string = ''): Promise<void> {
    const { data, error } = await this.supabase
      .from('announcements')
      .select('*')
      .ilike('title', `%${searchQuery}%`)
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (error) {
      this.snackBar.open('Erro ao carregar anúncios', 'Fechar', { duration: 5000 });
      throw error;
    }
    this.announcementsSubject.next(data || []);
  }

  async createAnnouncement(announcement: any): Promise<void> {
    const { data, error } = await this.supabase
      .from('announcements')
      .insert([announcement]);

    if (error) {
      this.snackBar.open('Erro ao criar anúncio', 'Fechar', { duration: 5000 });
      throw error;
    }
    await this.loadAnnouncements();
  }

  async updateAnnouncement(id: string, announcement: any): Promise<void> {
    const { data, error } = await this.supabase
      .from('announcements')
      .update(announcement)
      .eq('id', id);

    if (error) {
      this.snackBar.open('Erro ao atualizar anúncio', 'Fechar', { duration: 5000 });
      throw error;
    }
    await this.loadAnnouncements();
  }

  async deleteAnnouncement(id: string): Promise<void> {
    const { data, error } = await this.supabase
      .from('announcements')
      .delete()
      .eq('id', id);

    if (error) {
      this.snackBar.open('Erro ao excluir anúncio', 'Fechar', { duration: 5000 });
      throw error;
    }
    await this.loadAnnouncements();
  }
}
