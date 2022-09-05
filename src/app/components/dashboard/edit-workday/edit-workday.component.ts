import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Day} from "app/models/day";
import {WorkdayType} from "app/models/workday-type.model";


export type SelectValue = {
  value: string,
  label: string,
}

@Component({
  selector: 'app-edit-workday',
  templateUrl: './edit-workday.component.html',
  styleUrls: ['./edit-workday.component.css']
})

export class EditWorkdayComponent implements OnInit {

  public day: Day
  public calendarDate: Date
  public selectedWorkdayType: WorkdayType = null;

  public workingStatus: string = WorkdayType.WORKING
  public holidayStatus: string = WorkdayType.HOLIDAY
  public sicknessStatus: string = WorkdayType.SICKNESS
  public accidentAtWorkStatus: string = WorkdayType.ACCIDENT_AT_WORK

  workDayForm = this.formBuilder.group({
    id: null,
    date: null,
    usernameId: null,
    workingHours: null,
    extraHours: null,
    workPermitHours: null,
    funeralLeaveHours: null,
    holiday: false,
    sick: false,
    accidentAtWork: false,
    notes: '',
  });

  isCreation: boolean = true;

  addedHours: SelectValue[] = [];

  addableHours: SelectValue[] = [
    {value: 'workPermitHours', label: 'Ore di permesso'},
    {value: 'extraHours', label: 'Ore di straordinario'},
    {value: 'funeralLeaveHours', label: 'Ore di permesso per lutto'},
  ]

  showedHours = this.addableHours.filter(h => !this.addedHours.includes(h))

  hourFilled: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditWorkdayComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.day = data.day
    this.calendarDate = data.calendarDate

  }

  ngOnInit(): void {
    //TODO fetch account and check existence on db
    if (this.day.workday?.id) {
      this.isCreation = false;
      console.log("populate form")
    }
    if (this.isCreation) {
      console.log("new form")
      this.setSelectedWorkdayType(WorkdayType.WORKING);

    }
  }

  close() {
    this.dialogRef.close()
  }

  logWorkDay() {
  }

  addHours() {
    this.hourFilled = false
  }

  setAddedHours(hoursType: any) {
    if (!hoursType) {
      return
    }
    this.addedHours.push(hoursType);
    this.showedHours = this.addableHours.filter(h => !this.addedHours.includes(h))

    if (hoursType.value == 'workPermitHours') {
      this.workDayForm.patchValue({workPermitHours: 1});
    }

    if (hoursType.value == 'extraHours') {
      this.workDayForm.patchValue({extraHours: 1});
    }

    if (hoursType.value == 'funeralLeaveHours') {
      this.workDayForm.patchValue({funeralLeaveHours: 1});
    }

    this.hourFilled = true
  }

  checkWorkingDay() {
    return this.selectedWorkdayType == this.workingStatus;
  }

  setSelectedWorkdayType(selectedWorkdayType: WorkdayType) {
    this.addedHours = [];
    this.showedHours = this.addableHours.filter(h => !this.addedHours.includes(h))
    this.hourFilled = true

    this.selectedWorkdayType = selectedWorkdayType;
    this.workDayForm.patchValue({workingHours: 0});
    this.workDayForm.patchValue({extraHours: 0});
    this.workDayForm.patchValue({funeralLeaveHours: 0});
    this.workDayForm.patchValue({workPermitHours: 0});
    this.workDayForm.patchValue({holiday: false});
    this.workDayForm.patchValue({sick: false});
    this.workDayForm.patchValue({accidentAtWork: false});

    if (selectedWorkdayType == WorkdayType.WORKING) {
      this.workDayForm.patchValue({workingHours: 8});
    }
    if (selectedWorkdayType == WorkdayType.HOLIDAY) {
      this.workDayForm.patchValue({holiday: true});
    }
    if (selectedWorkdayType == WorkdayType.SICKNESS) {
      this.workDayForm.patchValue({sick: true});
    }
    if (selectedWorkdayType == WorkdayType.ACCIDENT_AT_WORK) {
      this.workDayForm.patchValue({accidentAtWork: true});
    }

  }

  deleteHoursType(hoursType: string) {
    this.addedHours = this.addedHours.filter(h => h.value !== hoursType);
    this.showedHours = this.addableHours.filter(h => !this.addedHours.includes(h))

    if (hoursType == 'workPermitHours') {
      this.workDayForm.patchValue({workPermitHours: 0});
    }

    if (hoursType == 'extraHours') {
      this.workDayForm.patchValue({extraHours: 0});
    }

    if (hoursType == 'funeralLeaveHours') {
      this.workDayForm.patchValue({funeralLeaveHours: 0});
    }

  }

  get workPermitHours() {
    return this.workDayForm.get('workPermitHours')!.value;
  }

  set workPermitHours(hours) {
    this.workDayForm.patchValue({workPermitHours: hours});
  }

  get extraHours() {
    return this.workDayForm.get('extraHours')!.value;
  }

  set extraHours(hours) {
    this.workDayForm.patchValue({extraHours: hours});
  }

  get funeralLeaveHours() {
    return this.workDayForm.get('funeralLeaveHours')!.value;
  }

  set funeralLeaveHours(hours) {
    this.workDayForm.patchValue({funeralLeaveHours: hours});
  }

  get notes() {
    return this.workDayForm.get('notes')!.value;
  }

  set notes(content) {
    this.workDayForm.patchValue({notes: content});
  }
}
