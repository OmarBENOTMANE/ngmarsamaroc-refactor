import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNavireComponent } from './list-navire.component';

describe('ListNavireComponent', () => {
  let component: ListNavireComponent;
  let fixture: ComponentFixture<ListNavireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNavireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNavireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
