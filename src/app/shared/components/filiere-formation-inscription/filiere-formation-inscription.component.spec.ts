import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliereFormationInscriptionComponent } from './filiere-formation-inscription.component';

describe('FiliereFormationInscriptionComponent', () => {
  let component: FiliereFormationInscriptionComponent;
  let fixture: ComponentFixture<FiliereFormationInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiliereFormationInscriptionComponent ]
    })
    .compileComponents();
  });
 
  beforeEach(() => {
    fixture = TestBed.createComponent(FiliereFormationInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
