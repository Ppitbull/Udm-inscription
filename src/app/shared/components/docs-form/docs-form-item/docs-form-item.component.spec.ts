import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsFormItemComponent } from './docs-form-item.component';

describe('DocsFormItemComponent', () => {
  let component: DocsFormItemComponent;
  let fixture: ComponentFixture<DocsFormItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocsFormItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsFormItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
