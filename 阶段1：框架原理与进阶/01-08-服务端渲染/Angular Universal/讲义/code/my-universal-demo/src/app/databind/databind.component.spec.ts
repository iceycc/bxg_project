import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabindComponent } from './databind.component';

describe('DatabindComponent', () => {
  let component: DatabindComponent;
  let fixture: ComponentFixture<DatabindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
