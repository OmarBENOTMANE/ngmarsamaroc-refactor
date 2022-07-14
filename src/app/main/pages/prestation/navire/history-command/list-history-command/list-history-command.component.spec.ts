import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHistoryCommandComponent } from './list-history-command.component';

describe('ListHistoryCommandComponent', () => {
  let component: ListHistoryCommandComponent;
  let fixture: ComponentFixture<ListHistoryCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHistoryCommandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHistoryCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
