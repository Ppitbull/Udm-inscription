import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAdminssionFinalComponent } from './form-adminssion-final.component';

describe('FormAdminssionFinalComponent', () => {
  let component: FormAdminssionFinalComponent;
  let fixture: ComponentFixture<FormAdminssionFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAdminssionFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAdminssionFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
