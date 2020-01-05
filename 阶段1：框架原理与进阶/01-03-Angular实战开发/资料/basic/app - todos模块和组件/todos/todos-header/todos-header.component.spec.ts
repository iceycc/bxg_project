import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosHeaderComponent } from './todos-header.component';

describe('TodosHeaderComponent', () => {
  let component: TodosHeaderComponent;
  let fixture: ComponentFixture<TodosHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
