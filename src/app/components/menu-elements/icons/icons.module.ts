import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AccidentAtWorkComponent} from "app/components/menu-elements/icons/accident-at-work/accident-at-work.component";
import {CloseComponent} from "app/components/menu-elements/icons/close/close.component";
import {DeleteComponent} from "app/components/menu-elements/icons/delete/delete.component";
import {ExtraComponent} from "app/components/menu-elements/icons/extra/extra.component";
import {FuneralLeaveComponent} from "app/components/menu-elements/icons/funeral-leave/funeral-leave.component";
import {HolidayComponent} from "app/components/menu-elements/icons/holiday/holiday.component";
import {LeftarrowComponent} from "app/components/menu-elements/icons/leftarrow/leftarrow.component";
import {PermissionComponent} from "app/components/menu-elements/icons/permission/permission.component";
import {PlusComponent} from "app/components/menu-elements/icons/plus/plus.component";
import {RightarrowComponent} from "app/components/menu-elements/icons/rightarrow/rightarrow.component";
import {SickComponent} from "app/components/menu-elements/icons/sick/sick.component";
import {SpinningCircleComponent} from "app/components/menu-elements/icons/spinning-circle/spinning-circle.component";
import {TimeComponent} from "app/components/menu-elements/icons/time/time.component";
import {WorkComponent} from "app/components/menu-elements/icons/work/work.component";


@NgModule({
  declarations: [
    AccidentAtWorkComponent,
    CloseComponent,
    DeleteComponent,
    ExtraComponent,
    FuneralLeaveComponent,
    HolidayComponent,
    LeftarrowComponent,
    PermissionComponent,
    PlusComponent,
    RightarrowComponent,
    SickComponent,
    SpinningCircleComponent,
    TimeComponent,
    WorkComponent
  ],
  exports: [
    AccidentAtWorkComponent,
    CloseComponent,
    DeleteComponent,
    ExtraComponent,
    FuneralLeaveComponent,
    HolidayComponent,
    LeftarrowComponent,
    PermissionComponent,
    PlusComponent,
    RightarrowComponent,
    SickComponent,
    SpinningCircleComponent,
    TimeComponent,
    WorkComponent
  ],
  imports: [
    CommonModule
  ]
})
export class IconsModule {
}
