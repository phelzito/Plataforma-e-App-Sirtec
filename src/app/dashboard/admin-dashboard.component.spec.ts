import { TestBed } from '@angular/core/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AuthService } from '../services/auth.service';
import { ContentService } from '../services/content.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Chart } from 'chart.js';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let authService: AuthService;
  let contentService: ContentService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { userRole$: { subscribe: jest.fn() } } },
        { provide: ContentService, useValue: { getTotalUsers: jest.fn(), getTotalAnnouncements: jest.fn(), getTotalNews: jest.fn(), getTotalDocuments: jest.fn() } },
        { provide: MatSnackBar, useValue: { open: jest.fn() } }
      ]
    });
    component = TestBed.inject(AdminDashboardComponent);
    authService = TestBed.inject(AuthService);
    contentService = TestBed.inject(ContentService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should load metrics', async () => {
    jest.spyOn(contentService, 'getTotalUsers').mockResolvedValue(10);
    jest.spyOn(contentService, 'getTotalAnnouncements').mockResolvedValue(5);
    jest.spyOn(contentService, 'getTotalNews').mockResolvedValue(3);
    jest.spyOn(contentService, 'getTotalDocuments').mockResolvedValue(2);
    await component.loadMetrics();
    expect(component.metrics.totalUsers).toBe(10);
    expect(component.metrics.totalAnnouncements).toBe(5);
    expect(component.metrics.totalNews).toBe(3);
    expect(component.metrics.totalDocuments).toBe(2);
  });

  it('should handle error when loading metrics', async () => {
    jest.spyOn(contentService, 'getTotalUsers').mockRejectedValue(new Error('Test error'));
    await component.loadMetrics();
    expect(snackBar.open).toHaveBeenCalled();
  });
});
