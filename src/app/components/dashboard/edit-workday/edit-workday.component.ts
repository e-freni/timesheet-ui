import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Account} from "app/models/account.model";
import {Day} from "app/models/day";
import {WorkdayType} from "app/models/workday-type.model";
import {Workday} from "app/models/workday.model";
import {AccountService} from "app/services/account.service";
import {WorkdayService} from "app/services/workday.service";
import {getFormattedTodaysDate} from "app/utils/date-utilities";


export type SelectValue = {
  id: number,
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
  isCreation: boolean = true;
  isSaving: boolean = false;
  account: Account = null;

  public workingStatus: string = WorkdayType.WORKING
  public holidayStatus: string = WorkdayType.HOLIDAY
  public sicknessStatus: string = WorkdayType.SICKNESS
  public accidentAtWorkStatus: string = WorkdayType.ACCIDENT_AT_WORK

  workDayForm = this.formBuilder.group({
    id: null,
    date: null,
    usernameId: null,
    workingHours: [0, [Validators.required, Validators.min(0), Validators.max(8)]],
    extraHours: [0, [Validators.required, Validators.min(0), Validators.max(24)]],
    workPermitHours: [0, [Validators.required, Validators.min(0), Validators.max(8)]],
    funeralLeaveHours: [0, [Validators.required, Validators.min(0), Validators.max(8)]],
    holiday: false,
    sick: false,
    accidentAtWork: false,
    notes: '',
  });


  addedHours: SelectValue[] = [];
  addableHours: SelectValue[] = [
    {id: 1, value: 'workPermitHours', label: 'Ore di permesso'},
    {id: 2, value: 'extraHours', label: 'Ore di straordinario'},
    {id: 3, value: 'funeralLeaveHours', label: 'Ore di permesso per lutto'},
  ]

  showedHours = this.addableHours.filter(h => !this.addedHours.includes(h))
  hourFilled: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private workdayService: WorkdayService,
    public dialogRef: MatDialogRef<EditWorkdayComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.day = data.day
    this.calendarDate = data.calendarDate
  }

  ngOnInit(): void {
    this.accountService.getObservableAccount().subscribe((account: Account | null) => {
      this.account = account;
      if (this.day.workday?.id) {
        this.workdayService.findWorkdayById(this.day.workday.id).subscribe(workday => {
          this.updateForm(workday);
          this.formTemplateFilling(workday);
        })
        this.isCreation = false;
      }
      if (this.isCreation) {
        this.workDayForm.patchValue({date: getFormattedTodaysDate()})
        this.workDayForm.patchValue({usernameId: this.account.id})
        this.setSelectedWorkdayType(WorkdayType.WORKING);
      }
    });
  }

  updateForm(workday: Workday): void {
    this.workDayForm.patchValue({
      id: workday.id,
      date: workday.date,
      usernameId: workday.usernameId,
      workingHours: workday.workingHours,
      extraHours: workday.extraHours,
      workPermitHours: workday.workPermitHours,
      funeralLeaveHours: workday.funeralLeaveHours,
      holiday: workday.holiday,
      sick: workday.sick,
      accidentAtWork: workday.accidentAtWork,
      notes: workday.notes,
    });
  }

  close() {
    this.dialogRef.close()
  }

  logWorkDay() {
    this.isSaving = true;

    //TODO call service
    // save or create discrimination

    this.isSaving = false;
  }

  deleteWorkDay() {
    this.isSaving = true;

    //TODO call service

    this.isSaving = false;
  }

  addHours() {
    this.hourFilled = false
  }

  setAddedHours(hoursType: any) {
    if (!hoursType) {
      return
    }

    this.refreshShowingArrays(hoursType);

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

  private refreshShowingArrays(hoursType: SelectValue) {
    this.addedHours.push(hoursType);
    this.showedHours = this.addableHours.filter(h1 => !this.addedHours.find(h2 => h1.id == h2.id))
  }

  checkWorkingDay() {
    return this.selectedWorkdayType == this.workingStatus;
  }

  //TODO semplificare struttura codice che ora è poco leggibile
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

  trashHoursType(hoursType: string) {
    this.addedHours = this.addedHours.filter(h => h.value !== hoursType);
    this.showedHours = this.addableHours.filter(h1 => !this.addedHours.find(h2 => h1.id == h2.id))

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

  private formTemplateFilling(workday: Workday) {
    if (!workday.holiday && !workday.sick && !workday.accidentAtWork) {
      this.selectedWorkdayType = WorkdayType.WORKING
    }
    if (workday.holiday) {
      this.selectedWorkdayType = WorkdayType.HOLIDAY
    }
    if (workday.sick) {
      this.selectedWorkdayType = WorkdayType.SICKNESS
    }
    if (workday.accidentAtWork) {
      this.selectedWorkdayType = WorkdayType.ACCIDENT_AT_WORK
    }
    if (workday.workPermitHours > 0) {
      this.addedHours.push({id: 1, value: 'workPermitHours', label: 'Ore di permesso'})
    }
    if (workday.extraHours > 0) {
      this.addedHours.push({id: 2, value: 'extraHours', label: 'Ore di straordinario'})
    }
    if (workday.funeralLeaveHours > 0) {
      this.addedHours.push({id: 3, value: 'funeralLeaveHours', label: 'Ore di permesso per lutto'})
    }

    this.showedHours = this.addableHours.filter(h1 => !this.addedHours.find(h2 => h1.id == h2.id))

  }

  decreaseWorkingHours(value: number) {
    this.workDayForm.patchValue({workingHours: (8 - value)});
  }
}
