import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from 'src/app/main/pages/page-login/page-login.component';
import { CommonViewComponent} from "../common-view/common-view.component";
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomeComponent} from "../../../home/home.component";
import { ErrorComponent} from "../../../error/error.component";
import { ListNavireComponent } from '../prestation/navire/list-navire/list-navire.component';
import { ListCommandComponent } from '../prestation/navire/command/list-command/list-command.component';
import { EditCommandComponent } from '../prestation/navire/command/edit-command/edit-command.component';
import { ListBulletinComponent } from '../prestation/navire/bulletin/list-bulletin/list-bulletin.component';
import { EditBulletinComponent } from '../prestation/navire/bulletin/edit-bulletin/edit-bulletin.component';
import { ListHistoryCommandComponent } from '../prestation/navire/history-command/list-history-command/list-history-command.component';
import { ViewHistoryCommandComponent } from '../prestation/navire/history-command/view-history-command/view-history-command.component';
import { ListHistoryBulletinComponent } from '../prestation/navire/history-bulletin/list-history-bulletin/list-history-bulletin.component';
import { ViewHistoryBulletinComponent } from '../prestation/navire/history-bulletin/view-history-bulletin/view-history-bulletin.component';

const routes :Routes  =  [
  {path:""  , redirectTo:"/login" , pathMatch: "full"},
  {path:"home"  , component:HomeComponent},
  {path:"login"  , component:PageLoginComponent},
  {path:"error", component:ErrorComponent},
  {path:"" , component:CommonViewComponent ,
    children :[
      // Dashboard
      {path:"dashboard" , component:DashboardComponent},

      // navire list
      {path:"navire/cmd/select", component:ListNavireComponent},

      // command
      // command list
      {path:"navire/cmd", component:ListCommandComponent},
      // command edit
      {path:"navire/cmd/:idcmd", component:EditCommandComponent},

      // bulletin
      // bulletin list 
      {path:"navire/bp" , component:ListBulletinComponent},
      // bulletin edit
      {path:"navire/bp/:idcmd" , component:EditBulletinComponent},

      // command history
      // command history list
      {path:"navire/historique-cmd", component:ListHistoryCommandComponent},
      // command history view
      {path:"navire/historique-cmd/:idcmd",component:ViewHistoryCommandComponent},

      // bulletin history
      // bulletin history list
      {path:"navire/historique-bp", component:ListHistoryBulletinComponent},
      // bulletin history view
      {path:"navire/historique-bp/:idcmd", component:ViewHistoryBulletinComponent},





    ]
  },
  
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[ RouterModule]
})
export class RoutingModule { }
