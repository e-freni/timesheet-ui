import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Day} from "app/models/day";

@Component({
  selector: 'app-edit-workday',
  templateUrl: './edit-workday.component.html',
  styleUrls: ['./edit-workday.component.css']
})
export class EditWorkdayComponent implements OnInit {
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
  isCreation: boolean = false;



  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditWorkdayComponent>,
    @Inject(MAT_DIALOG_DATA) public day: Day,
  )
    {  }

  ngOnInit(): void {
    if(this.day.workday){
      console.log("populate form")
    }
    console.log('pippo', this.day)
  }

  close() {
    this.dialogRef.close()
  }

  logWorkDay() {

  }
}
