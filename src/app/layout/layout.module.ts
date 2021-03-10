import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { DataAsTableComponent } from './components/data-as-table/data-as-table.component';
import { OneDayLayoutComponent } from './container/one-day-layout/one-day-layout.component';
import { OneYearLayoutComponent } from './container/one-year-layout/one-year-layout.component';
import { DayChartComponent } from './components/day-chart/day-chart.component';
import { YearChartComponent } from './components/year-chart/year-chart.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            {
                path: 'oneDay', component: OneDayLayoutComponent
            },
            {
                path: 'oneYear', component: OneYearLayoutComponent
            }
        ]
    }
];

@NgModule({
    declarations: [
        LayoutComponent,
        DataAsTableComponent,
        DayChartComponent,
        OneDayLayoutComponent,
        OneYearLayoutComponent,
        YearChartComponent
    ],
    exports: [
        LayoutComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class LayoutModule { }
