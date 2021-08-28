import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestWelcomeComponent } from './guest-welcome.component';

describe('GuestWelcomeComponent', () => {
  let component: GuestWelcomeComponent;
  let fixture: ComponentFixture<GuestWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestWelcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
