import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosPersoInscriptionComponent } from './infos-perso-inscription.component';

describe('InfosPersoInscriptionComponent', () => {
  let component: InfosPersoInscriptionComponent;
  let fixture: ComponentFixture<InfosPersoInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosPersoInscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosPersoInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
