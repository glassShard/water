import {Component, NgModule} from '@angular/core';
import {ActivationStart, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ChartComponent} from "./chart/chart.component";
import {StartWaterComponent} from "./start-water/start-water.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent, pathMatch: 'full'},
  {path: 'chart', component: ChartComponent, pathMatch: 'full'},
  {path: 'water', component: StartWaterComponent, pathMatch: 'full'},
  {path: '', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
