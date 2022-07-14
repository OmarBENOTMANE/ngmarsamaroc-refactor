import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingModule } from './main/pages/routing/routing.module';


@NgModule({
  imports: [RoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
