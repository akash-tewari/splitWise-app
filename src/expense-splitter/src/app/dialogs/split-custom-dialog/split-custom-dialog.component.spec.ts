import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitCustomDialogComponent } from './split-custom-dialog.component';

describe('SplitCustomDialogComponent', () => {
  let component: SplitCustomDialogComponent;
  let fixture: ComponentFixture<SplitCustomDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SplitCustomDialogComponent]
    });
    fixture = TestBed.createComponent(SplitCustomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
