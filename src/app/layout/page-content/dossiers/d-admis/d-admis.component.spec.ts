import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DAdmisComponent } from './d-admis.component';

describe('DAdmisComponent', () => {
  let component: DAdmisComponent;
  let fixture: ComponentFixture<DAdmisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DAdmisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DAdmisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
