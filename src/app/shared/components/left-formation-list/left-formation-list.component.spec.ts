import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftFormationListComponent } from './left-formation-list.component';

describe('LeftFormationListComponent', () => {
  let component: LeftFormationListComponent;
  let fixture: ComponentFixture<LeftFormationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftFormationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftFormationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
