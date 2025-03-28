import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../services/auth.service';
import { NewsService } from '../services/news.service';
import { DocumentService } from '../services/document.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: AuthService;
  let newsService: NewsService;
  let documentService: DocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: AuthService, useValue: { getUserUnit: jest.fn() } },
        { provide: NewsService, useValue: { getNewsByUnit: jest.fn() } },
        { provide: DocumentService, useValue: { getDocumentsByUnit: jest.fn() } }
      ]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    newsService = TestBed.inject(NewsService);
    documentService = TestBed.inject(DocumentService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
