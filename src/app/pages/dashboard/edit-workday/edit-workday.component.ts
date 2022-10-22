import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Account} from "app/models/account.model";
import {Day} from "app/models/day";
import {WorkdayType} from "app/models/workday-type.model";
import {Workday} from "app/models/workday.model";
import {AccountService} from "app/services/account.service";
import {WorkdayService} from "app/services/workday.service";
import {getFormattedDate} from "app/utils/date-utilities";


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
  isLoading: boolean = false;
  account: Account = null;

  public workingStatus: string = WorkdayType.WORKING
  public holidayStatus: string = WorkdayType.HOLIDAY
  public sicknessStatus: string = WorkdayType.SICKNESS
  public accidentAtWorkStatus: string = WorkdayType.ACCIDENT_AT_WORK

  workDayForm = this.formBuilder.group({
    id: null,
    date: null,
    userId: null,
    workingHours: [0, [Validators.required, Validators.min(0), Validators.max(8)]],
    extraHours: [0, [Validators.required, Validators.min(0), Validators.max(24)]],
    nightWorkingHours: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
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
    {id: 3, value: 'nightWorkingHours', label: 'Ore di lavoro notturno'},
    {id: 4, value: 'funeralLeaveHours', label: 'Ore di permesso per lutto'},
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
        const dayDateZeroBased = this.calendarDate.getDate() + 1
        this.workDayForm.patchValue({date: getFormattedDate(this.calendarDate.getFullYear(), this.calendarDate.getMonth(), dayDateZeroBased)})
        this.workDayForm.patchValue({userId: this.account.id})
        this.setSelectedWorkdayType(WorkdayType.WORKING);
      }
    });
  }

  updateForm(workday: Workday): void {
    this.workDayForm.patchValue({
      id: workday.id,
      date: workday.date,
      userId: workday.userId,
      workingHours: workday.workingHours,
      extraHours: workday.extraHours,
      nightWorkingHours: workday.nightWorkingHours,
      workPermitHours: workday.workPermitHours,
      funeralLeaveHours: workday.funeralLeaveHours,
      holiday: workday.holiday,
      sick: workday.sick,
      accidentAtWork: workday.accidentAtWork,
      notes: workday.notes,
    });
  }

  private createFromForm(): Workday {
    return {
      id: this.workDayForm.get(['id'])!.value,
      date: this.workDayForm.get(['date'])!.value,
      userId: this.workDayForm.get(['userId'])!.value,
      workingHours: this.workDayForm.get(['workingHours'])!.value,
      extraHours: this.workDayForm.get(['extraHours'])!.value,
      nightWorkingHours: this.workDayForm.get(['nightWorkingHours'])!.value,
      workPermitHours: this.workDayForm.get(['workPermitHours'])!.value,
      funeralLeaveHours: this.workDayForm.get(['funeralLeaveHours'])!.value,
      holiday: this.workDayForm.get(['holiday'])!.value,
      sick: this.workDayForm.get(['sick'])!.value,
      accidentAtWork: this.workDayForm.get(['accidentAtWork'])!.value,
      notes: this.workDayForm.get(['notes'])!.value,
    };
  }

  back() {
    this.dialogRef.close()
  }

  close() {
    this.isLoading = false
    const hasBeenChanged = true
    this.dialogRef.close(hasBeenChanged)
  }

  logWorkDay() {
    this.isLoading = true;
    const workday = this.createFromForm();

    if(this.isCreation){
      this.workdayService.createWorkday(workday).subscribe(() => {
        this.close();
      })
    } else {
      this.workdayService.editWorkday(workday).subscribe(() => {
        this.close();
      })
    }
  }

  deleteWorkDay() {
    this.isLoading = true;
    this.workdayService.deleteWorkday(this.workDayForm.get(['id'])!.value, this.account.id).subscribe(() => {
      this.close();
    })
  }

  addHours() {
    this.hourFilled = false;
  }

  setAddedHours(hoursType: any) {
    if (!hoursType) {
      return;
    }

    this.refreshShowingArrays(hoursType);

    const initHours = 1;
    if (hoursType.value == 'workPermitHours') {
      this.workDayForm.patchValue({workPermitHours: initHours});
    }

    if (hoursType.value == 'extraHours') {
      this.workDayForm.patchValue({extraHours: initHours});
    }

    if (hoursType.value == 'nightWorkingHours') {
      this.workDayForm.patchValue({nightWorkingHours: initHours});
    }

    if (hoursType.value == 'funeralLeaveHours') {
      this.workDayForm.patchValue({funeralLeaveHours: initHours});
    }

    this.decreaseWorkingHours()
    this.hourFilled = true;
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
    this.showedHours = this.addableHours.filter(h => !this.addedHours.includes(h));
    this.hourFilled = true;
    this.selectedWorkdayType = selectedWorkdayType;

    this.workDayForm.patchValue({workingHours: 0});
    this.workDayForm.patchValue({extraHours: 0});
    this.workDayForm.patchValue({nightWorkingHours: 0});
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
    this.showedHours = this.addableHours.filter(h1 => !this.addedHours.find(h2 => h1.id == h2.id));

    if (hoursType == 'workPermitHours') {
      this.correctWorkingHours('workPermitHours');
      this.workDayForm.patchValue({workPermitHours: 0});
    }

    if (hoursType == 'extraHours') {
      this.workDayForm.patchValue({extraHours: 0});
    }

    if (hoursType == 'nightWorkingHours') {
      this.workDayForm.patchValue({nightWorkingHours: 0});
    }

    if (hoursType == 'funeralLeaveHours') {
      this.correctWorkingHours('funeralLeaveHours');
      this.workDayForm.patchValue({funeralLeaveHours: 0});
    }
    this.workDayForm.setValidators(null);
  }

  private formTemplateFilling(workday: Workday) {
    if (!workday.holiday && !workday.sick && !workday.accidentAtWork) {
      this.selectedWorkdayType = WorkdayType.WORKING;
    }
    if (workday.holiday) {
      this.selectedWorkdayType = WorkdayType.HOLIDAY;
    }
    if (workday.sick) {
      this.selectedWorkdayType = WorkdayType.SICKNESS;
    }
    if (workday.accidentAtWork) {
      this.selectedWorkdayType = WorkdayType.ACCIDENT_AT_WORK;
    }
    if (workday.workPermitHours > 0) {
      this.addedHours.push({id: 1, value: 'workPermitHours', label: 'Ore di permesso'});
    }
    if (workday.extraHours > 0) {
      this.addedHours.push({id: 2, value: 'extraHours', label: 'Ore di straordinario'});
    }
    if (workday.nightWorkingHours > 0) {
      this.addedHours.push({id: 3, value: 'nightWorkingHours', label: 'Ore di lavoro notturno'});
    }
    if (workday.funeralLeaveHours > 0) {
      this.addedHours.push({id: 4, value: 'funeralLeaveHours', label: 'Ore di permesso per lutto'});
    }
    this.showedHours = this.addableHours.filter(h1 => !this.addedHours.find(h2 => h1.id == h2.id));
  }

  private correctWorkingHours(fieldName: string) {
    const deletedHours = this.workDayForm.get(fieldName)!.value;
    let workingHours = this.workDayForm.get('workingHours')!.value;
    workingHours = workingHours + deletedHours;
    this.workDayForm.patchValue({workingHours: workingHours});
  }

  decreaseWorkingHours() {
    const permitHours = this.workDayForm.get('workPermitHours')!.value;
    const funeralLeaveHours = this.workDayForm.get('funeralLeaveHours')!.value;
    this.workDayForm.patchValue({workingHours: (8 - (permitHours + funeralLeaveHours))});
  }
}
