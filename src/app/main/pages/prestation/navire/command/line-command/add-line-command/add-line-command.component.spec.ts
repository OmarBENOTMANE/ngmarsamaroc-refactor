import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLineCommandComponent } from './add-line-command.component';

describe('AddLineCommandComponent', () => {
  let component: AddLineCommandComponent;
  let fixture: ComponentFixture<AddLineCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLineCommandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLineCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
