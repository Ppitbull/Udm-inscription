import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DAcceptComponent } from './d-accept.component';

describe('DAcceptComponent', () => {
  let component: DAcceptComponent;
  let fixture: ComponentFixture<DAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DAcceptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
