import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NewsService } from '../services/news.service';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  news: any[] = [];
  documents: any[] = [];

  constructor(
    private authService: AuthService,
    private newsService: NewsService,
    private documentService: DocumentService
  ) {}

  ngOnInit() {
    const userUnit = this.authService.getUserUnit();
    this.loadNews(userUnit);
    this.loadDocuments(userUnit);
  }

  loadNews(unit: string) {
    this.newsService.getNewsByUnit(unit).subscribe({
      next: (data) => this.news = data,
      error: (error) => console.error(error)
    });
  }

  loadDocuments(unit: string) {
    this.documentService.getDocumentsByUnit(unit).subscribe({
      next: (data) => this.documents = data,
      error: (error) => console.error(error)
    });
  }
}
