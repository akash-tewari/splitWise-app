import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeeDialogComponent } from './payee-dialog.component';

describe('PayeeDialogComponent', () => {
  let component: PayeeDialogComponent;
  let fixture: ComponentFixture<PayeeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayeeDialogComponent]
    });
    fixture = TestBed.createComponent(PayeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
