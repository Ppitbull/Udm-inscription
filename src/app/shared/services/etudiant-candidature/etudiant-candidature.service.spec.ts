import { TestBed } from '@angular/core/testing';

import { EtudiantCandidatureService } from './etudiant-candidature.service';

describe('EtudiantCandidatureService', () => {
  let service: EtudiantCandidatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtudiantCandidatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
