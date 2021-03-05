import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ChartistModule } from 'ng-chartist';

import { LayoutComponent } from './layout/layout.component';
import { DataAsTableComponent } from './components/data-as-table/data-as-table.component';
import { DayChartComponentComponent } from './components/day-chart-component/day-chart-component.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent
    }
];

@NgModule({
    declarations: [
        LayoutComponent,
        DataAsTableComponent,
        DayChartComponentComponent
    ],
    exports: [
        LayoutComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ChartistModule
    ]
})
export class LayoutModule { }
