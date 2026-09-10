import {NgModule} from '@angular/core';
import {AccountBalancesComponent} from './components/account-balances/account-balances.component';
import {DatatableComponent} from './components/datatable/datatable.component';
import {AutoCompleteComponent} from './components/inputs/auto-complete/auto-complete.component';
import {DropdownComponent} from './components/inputs/dropdown/dropdown.component';
import {ImageUploadComponent} from './components/inputs/image-upload/image-upload.component';
import {InputDateComponent} from './components/inputs/input-date/input-date.component';
import {InputMaskComponent} from './components/inputs/input-mask/input-mask.component';
import {InputNumberComponent} from './components/inputs/input-number/input-number.component';
import {InputTextComponent} from './components/inputs/input-text/input-text.component';
import {MultiSelectComponent} from './components/inputs/multi-select/multi-select.component';
import {LoadingComponent} from './components/loading/loading.component';
import {MobileTreeListComponent} from './components/mobile-tree-list/mobile-tree-list.component';
import {ScreenReportButtonComponent} from './components/screen-report-button/screen-report-button.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';

const COMPONENTS = [AccountBalancesComponent, DatatableComponent, AutoCompleteComponent, DropdownComponent,
  ImageUploadComponent, InputDateComponent, InputMaskComponent, InputNumberComponent, InputTextComponent,
  MultiSelectComponent, LoadingComponent, MobileTreeListComponent, ScreenReportButtonComponent, SidebarComponent];

@NgModule({imports: COMPONENTS, exports: COMPONENTS})
export class SmartverseComponentsModule {}
