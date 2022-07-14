import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHistoryBulletinComponent } from './view-history-bulletin.component';

describe('ViewHistoryBulletinComponent', () => {
  let component: ViewHistoryBulletinComponent;
  let fixture: ComponentFixture<ViewHistoryBulletinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHistoryBulletinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHistoryBulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
