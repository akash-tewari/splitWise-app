import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitAmongDialogComponent } from './split-among-dialog.component';

describe('SplitAmongDialogComponent', () => {
  let component: SplitAmongDialogComponent;
  let fixture: ComponentFixture<SplitAmongDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SplitAmongDialogComponent]
    });
    fixture = TestBed.createComponent(SplitAmongDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
