import { TestBed } from '@angular/core/testing';
import { ContentService } from './content.service';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('ContentService', () => {
  let service: ContentService;
  let supabase: SupabaseClient;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SupabaseClient, useValue: createClient('test', 'test') },
        { provide: MatSnackBar, useValue: { open: jest.fn() } }
      ]
    });
    service = TestBed.inject(ContentService);
    supabase = TestBed.inject(SupabaseClient);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get total users', async () => {
    jest.spyOn(supabase, 'from').mockReturnValue({
      select: jest.fn().mockReturnValue({ count: 10 })
    } as any);
    const totalUsers = await service.getTotalUsers();
    expect(totalUsers).toBe(10);
  });

  it('should handle error when getting total users', async () => {
    jest.spyOn(supabase, 'from').mockReturnValue({
      select: jest.fn().mockRejectedValue(new Error('Test error'))
    } as any);
    await service.getTotalUsers();
    expect(snackBar.open).toHaveBeenCalled();
  });
});
