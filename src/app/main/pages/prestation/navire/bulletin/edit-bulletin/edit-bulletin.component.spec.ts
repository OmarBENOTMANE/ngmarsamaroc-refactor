import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBulletinComponent } from './edit-bulletin.component';

describe('EditBulletinComponent', () => {
  let component: EditBulletinComponent;
  let fixture: ComponentFixture<EditBulletinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBulletinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
