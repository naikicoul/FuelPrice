import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
    declarations: [
        HeaderComponent,
        LoadingComponent
    ],
    exports: [
        HeaderComponent,
        LoadingComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule
    ]
})
export class SharedModule { }
