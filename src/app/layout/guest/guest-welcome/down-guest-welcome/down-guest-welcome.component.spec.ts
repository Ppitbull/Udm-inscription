import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownGuestWelcomeComponent } from './down-guest-welcome.component';

describe('DownGuestWelcomeComponent', () => {
  let component: DownGuestWelcomeComponent;
  let fixture: ComponentFixture<DownGuestWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownGuestWelcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownGuestWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
