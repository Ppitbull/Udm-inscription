import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationsInscriptionComponent } from './qualifications-inscription.component';

describe('QualificationsInscriptionComponent', () => {
  let component: QualificationsInscriptionComponent;
  let fixture: ComponentFixture<QualificationsInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualificationsInscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationsInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
