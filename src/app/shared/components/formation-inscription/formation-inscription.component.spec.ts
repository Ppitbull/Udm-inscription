import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationInscriptionComponent } from './formation-inscription.component';

describe('FormationInscriptionComponent', () => {
  let component: FormationInscriptionComponent;
  let fixture: ComponentFixture<FormationInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationInscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
