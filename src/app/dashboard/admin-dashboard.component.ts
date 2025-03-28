import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ContentService } from '../services/content.service';
import { ActivityService } from '../services/activity.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Chart, registerables } from 'chart.js';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  chart: any;
  metrics = {
    totalUsers: 0,
    totalAnnouncements: 0,
    totalNews: 0,
    totalDocuments: 0,
    activeUsers: 0,
    recentActivity: 0
  };
  activityLogs: any[] = [];
  isLoading = true;
  private dataCache: { [key: string]: number } = {};

  constructor(
    private authService: AuthService,
    private contentService: ContentService,
    private activityService: ActivityService,
    private snackBar: MatSnackBar
  ) {
    Chart.register(...registerables);
  }

  async ngOnInit() {
    await this.loadMetrics();
    await this.loadActivityLogs();
    this.createChart();
    this.isLoading = false;
  }

  async loadActivityLogs() {
    try {
      this.activityLogs = await this.activityService.getRecentActivities();
    } catch (error) {
      this.snackBar.open('Erro ao carregar logs de atividade', 'Fechar', { duration: 5000 });
    }
  }

  // ... (restante do código permanece igual)
}
