import { Component, Input } from '@angular/core';
import { ContentService } from '../services/content.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.css']
})
export class AnnouncementListComponent {
  @Input() announcements: any[] = [];
  isLoading = false;

  constructor(
    private contentService: ContentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadAnnouncements();
  }

  async loadAnnouncements() {
    this.isLoading = true;
    try {
      await this.contentService.loadAnnouncements(1, 10);
    } catch (error) {
      this.snackBar.open('Erro ao carregar anúncios', 'Fechar', { duration: 5000 });
    } finally {
      this.isLoading = false;
    }
  }
}
