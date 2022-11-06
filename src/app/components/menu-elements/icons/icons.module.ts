import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccidentAtWorkComponent } from 'app/components/menu-elements/icons/accident-at-work/accident-at-work.component';
import { CloseComponent } from 'app/components/menu-elements/icons/close/close.component';
import { DeleteComponent } from 'app/components/menu-elements/icons/delete/delete.component';
import { ExtraComponent } from 'app/components/menu-elements/icons/extra/extra.component';
import { FuneralLeaveComponent } from 'app/components/menu-elements/icons/funeral-leave/funeral-leave.component';
import { HolidayComponent } from 'app/components/menu-elements/icons/holiday/holiday.component';
import { LeftarrowComponent } from 'app/components/menu-elements/icons/leftarrow/leftarrow.component';
import { PermissionComponent } from 'app/components/menu-elements/icons/permission/permission.component';
import { PlusComponent } from 'app/components/menu-elements/icons/plus/plus.component';
import { RightarrowComponent } from 'app/components/menu-elements/icons/rightarrow/rightarrow.component';
import { SickComponent } from 'app/components/menu-elements/icons/sick/sick.component';
import { SpinningCircleComponent } from 'app/components/menu-elements/icons/spinning-circle/spinning-circle.component';
import { TimeComponent } from 'app/components/menu-elements/icons/time/time.component';
import { WorkComponent } from 'app/components/menu-elements/icons/work/work.component';
import { ShareComponent } from 'app/components/menu-elements/icons/share/share.component';
import { ExportComponent } from 'app/components/menu-elements/icons/export/export.component';
import { AnalyticsComponent } from 'app/components/menu-elements/icons/analytics/analytics.component';
import { EditDataComponent } from 'app/components/menu-elements/icons/edit-data/edit-data.component';
import { NightHoursComponent } from 'app/components/menu-elements/icons/night-hours/night-hours.component';
import { AddComponent } from 'app/components/menu-elements/icons/add/add.component';
import { TodayComponent } from 'app/components/menu-elements/icons/today/today.component';
import { FingerPrintComponent } from 'app/components/menu-elements/icons/finger-print/finger-print.component';
import { EyeOpenedComponent } from 'app/components/menu-elements/icons/eye/eye-opened.component';
import { EyeClosedComponent } from 'app/components/menu-elements/icons/eye/eye-closed.component';
import { UserComponent } from 'app/components/menu-elements/icons/user/user.component';

@NgModule({
  declarations: [
    AccidentAtWorkComponent,
    AddComponent,
    AnalyticsComponent,
    CloseComponent,
    DeleteComponent,
    EditDataComponent,
    ExportComponent,
    ExtraComponent,
    EyeOpenedComponent,
    EyeClosedComponent,
    FingerPrintComponent,
    FuneralLeaveComponent,
    HolidayComponent,
    LeftarrowComponent,
    NightHoursComponent,
    PermissionComponent,
    PlusComponent,
    RightarrowComponent,
    ShareComponent,
    SickComponent,
    SpinningCircleComponent,
    TimeComponent,
    TodayComponent,
    UserComponent,
    WorkComponent,
  ],
  exports: [
    AccidentAtWorkComponent,
    AddComponent,
    AnalyticsComponent,
    CloseComponent,
    DeleteComponent,
    EditDataComponent,
    ExportComponent,
    EyeOpenedComponent,
    EyeClosedComponent,
    ExtraComponent,
    FingerPrintComponent,
    FuneralLeaveComponent,
    HolidayComponent,
    LeftarrowComponent,
    NightHoursComponent,
    PermissionComponent,
    PlusComponent,
    RightarrowComponent,
    ShareComponent,
    SickComponent,
    SpinningCircleComponent,
    TimeComponent,
    TodayComponent,
    UserComponent,
    WorkComponent,
  ],
  imports: [CommonModule],
})
export class IconsModule {}
