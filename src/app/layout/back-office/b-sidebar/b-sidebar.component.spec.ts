import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BSidebarComponent } from './b-sidebar.component';

describe('BSidebarComponent', () => {
  let component: BSidebarComponent;
  let fixture: ComponentFixture<BSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
