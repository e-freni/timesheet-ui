import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkdayComponent } from 'app/pages/dashboard/calendar/edit-workday/edit-workday.component';

describe('EditWorkdayComponent', () => {
  let component: EditWorkdayComponent;
  let fixture: ComponentFixture<EditWorkdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditWorkdayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditWorkdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
