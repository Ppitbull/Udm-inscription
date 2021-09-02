import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCandidatureComponent } from './modal-candidature.component';

describe('ModalCandidatureComponent', () => {
  let component: ModalCandidatureComponent;
  let fixture: ComponentFixture<ModalCandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCandidatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
