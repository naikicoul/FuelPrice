import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { DataAsTableComponent } from './components/data-as-table/data-as-table.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent
    }
];

@NgModule({
    declarations: [
        LayoutComponent,
        DataAsTableComponent
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
