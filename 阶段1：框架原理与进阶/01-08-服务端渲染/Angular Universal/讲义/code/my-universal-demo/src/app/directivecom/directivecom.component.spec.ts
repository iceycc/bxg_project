import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectivecomComponent } from './directivecom.component';

describe('DirectivecomComponent', () => {
  let component: DirectivecomComponent;
  let fixture: ComponentFixture<DirectivecomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectivecomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectivecomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
