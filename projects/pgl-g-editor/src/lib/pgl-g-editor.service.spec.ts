import { TestBed } from '@angular/core/testing';

import { PglGEditorService } from './pgl-g-editor.service';

describe('PglGEditorService', () => {
  let service: PglGEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PglGEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
