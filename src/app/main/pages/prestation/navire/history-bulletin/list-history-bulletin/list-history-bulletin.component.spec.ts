import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHistoryBulletinComponent } from './list-history-bulletin.component';

describe('ListHistoryBulletinComponent', () => {
  let component: ListHistoryBulletinComponent;
  let fixture: ComponentFixture<ListHistoryBulletinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHistoryBulletinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHistoryBulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
