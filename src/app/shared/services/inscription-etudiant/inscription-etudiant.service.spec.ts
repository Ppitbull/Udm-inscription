import { TestBed } from '@angular/core/testing';

import { InscriptionEtudiantService } from './inscription-etudiant.service';

describe('InscriptionEtudiantService', () => {
  let service: InscriptionEtudiantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscriptionEtudiantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
