import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PglGEditorComponent } from './pgl-g-editor.component';

describe('PglGEditorComponent', () => {
  let component: PglGEditorComponent;
  let fixture: ComponentFixture<PglGEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PglGEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PglGEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
