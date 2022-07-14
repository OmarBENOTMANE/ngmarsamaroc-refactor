import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './shared/component/nav-bar/nav-bar.component';
import { AddFormComponent } from './shared/component/add-form/add-form.component';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UsersComponent} from "./pages/administration/users/users.component";
import { CommonViewComponent } from './pages/common-view/common-view.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { TranslateModule } from '@ngx-translate/core';
import {NgxUiLoaderConfig, NgxUiLoaderModule} from 'ngx-ui-loader';
import { ListNavireComponent } from './pages/prestation/navire/list-navire/list-navire.component';
import { DialogComponent } from './shared/component/dialog/dialog.component';
import { SnackbarComponent } from './shared/component/snackbar/snackbar.component';
import { NavigationModule } from './shared/component/navigation';
import { UserModule } from './shared/component/user/user.module';
import { LanguagesModule } from './shared/component/languages/languages.module';
import { ScrollbarModule } from './shared/directives/scrollbar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NotificationsModule } from './shared/component/notifications/notifications.module';
import { EditBulletinComponent } from './pages/prestation/navire/bulletin/edit-bulletin/edit-bulletin.component';
import { ListBulletinComponent } from './pages/prestation/navire/bulletin/list-bulletin/list-bulletin.component';
import { EditCommandComponent } from './pages/prestation/navire/command/edit-command/edit-command.component';
import { ListCommandComponent } from './pages/prestation/navire/command/list-command/list-command.component';
import { AddLineCommandComponent } from './pages/prestation/navire/command/line-command/add-line-command/add-line-command.component';
import { EditLineCommandComponent } from './pages/prestation/navire/command/line-command/edit-line-command/edit-line-command.component';
import { ListHistoryCommandComponent } from './pages/prestation/navire/history-command/list-history-command/list-history-command.component';
import { ViewHistoryCommandComponent } from './pages/prestation/navire/history-command/view-history-command/view-history-command.component';
import { ListHistoryBulletinComponent } from './pages/prestation/navire/history-bulletin/list-history-bulletin/list-history-bulletin.component';
import { ViewHistoryBulletinComponent } from './pages/prestation/navire/history-bulletin/view-history-bulletin/view-history-bulletin.component';
import { CancelDialogComponent } from './shared/component/cancel-dialog/cancel-dialog.component';
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  'bgsColor': '#50a4ed',
  'bgsOpacity': 0.5,
  'bgsPosition': 'top-right',
  'bgsSize': 70,
  'bgsType': 'three-strings',
  'blur': 5,
  'fgsColor': '#50a4ed',
  'fgsPosition': 'center-center',
  'fgsSize': 90,
  'fgsType': 'three-strings',
  'gap': 24,
  'logoPosition': 'center-center',
  'logoSize': 120,
  'logoUrl': '',
  'overlayColor': 'rgba(40,40,40,0.15)',
  'pbColor': '#50a4ed',
  'pbDirection': 'ltr',
  'pbThickness': 3,
  'hasProgressBar': true,
  'text': 'Chargement en cours...',
  'textColor': '#50a4ed',
  'textPosition': 'center-center'
};

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [
    NavBarComponent,
    AddFormComponent,
    UsersComponent,
    CommonViewComponent,
    DashboardComponent,
    DialogComponent,
    SnackbarComponent,
    ListNavireComponent,
    EditBulletinComponent,
    ListBulletinComponent,
    EditCommandComponent,
    ListCommandComponent,
    AddLineCommandComponent,
    EditLineCommandComponent,
    ListHistoryCommandComponent,
    ViewHistoryCommandComponent,
    ListHistoryBulletinComponent,
    ViewHistoryBulletinComponent,
    CancelDialogComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    CdkAccordionModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    MomentDateModule ,
    TranslateModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NavigationModule,
    UserModule,
    LanguagesModule,
    ScrollbarModule,
    PerfectScrollbarModule,
    NotificationsModule
    
  ],
  exports:[
    TranslateModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
})

export class MainModule { }
