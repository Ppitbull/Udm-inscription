import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DRefusComponent } from './d-refus.component';

describe('DRefusComponent', () => {
  let component: DRefusComponent;
  let fixture: ComponentFixture<DRefusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DRefusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DRefusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
