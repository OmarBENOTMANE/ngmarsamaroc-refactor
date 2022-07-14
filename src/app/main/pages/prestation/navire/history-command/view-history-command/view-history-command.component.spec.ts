import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHistoryCommandComponent } from './view-history-command.component';

describe('ViewHistoryCommandComponent', () => {
  let component: ViewHistoryCommandComponent;
  let fixture: ComponentFixture<ViewHistoryCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHistoryCommandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHistoryCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
