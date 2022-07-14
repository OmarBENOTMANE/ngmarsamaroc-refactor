import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScrollbarModule } from '../../directives/scrollbar';
import { VerticalNavigationAsideItemComponent } from './vertical/components/aside/aside.component';
import { VerticalNavigationBasicItemComponent } from './vertical/components/basic/basic.component';
import { VerticalNavigationCollapsableItemComponent } from './vertical/components/collapsable/collapsable.component';
import { VerticalNavigationDividerItemComponent } from './vertical/components/divider/divider.component';
import { VerticalNavigationGroupItemComponent } from './vertical/components/group/group.component';
import { VerticalNavigationSpacerItemComponent } from './vertical/components/spacer/spacer.component';
import { VerticalNavigationComponent } from './vertical/vertical.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
  };
@NgModule({
    declarations: [
        VerticalNavigationAsideItemComponent,
        VerticalNavigationBasicItemComponent,
        VerticalNavigationCollapsableItemComponent,
        VerticalNavigationDividerItemComponent,
        VerticalNavigationGroupItemComponent,
        VerticalNavigationSpacerItemComponent,
        VerticalNavigationComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        ScrollbarModule,
        PerfectScrollbarModule,
    ],
    exports     : [
        VerticalNavigationComponent
    ],
    providers: [
        {
          provide: PERFECT_SCROLLBAR_CONFIG,
          useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
      ],
})
export class NavigationModule
{
}
