import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BLayoutComponent } from './b-layout.component';

describe('BLayoutComponent', () => {
  let component: BLayoutComponent;
  let fixture: ComponentFixture<BLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});