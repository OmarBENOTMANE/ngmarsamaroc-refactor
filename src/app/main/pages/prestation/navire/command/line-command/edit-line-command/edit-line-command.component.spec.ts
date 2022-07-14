import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLineCommandComponent } from './edit-line-command.component';

describe('EditLineCommandComponent', () => {
  let component: EditLineCommandComponent;
  let fixture: ComponentFixture<EditLineCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLineCommandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLineCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
