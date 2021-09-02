import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEtudiantListComponent } from './table-etudiant-list.component';

describe('TableEtudiantListComponent', () => {
  let component: TableEtudiantListComponent;
  let fixture: ComponentFixture<TableEtudiantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableEtudiantListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEtudiantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
