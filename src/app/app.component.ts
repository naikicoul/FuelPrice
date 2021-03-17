import { Component } from '@angular/core';

import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { NgxSpinnerService } from 'ngx-spinner';

import { LoadingService } from './shared/services/loading.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    title = 'FuelPrice';

    loadingStatus$ = this.loadingService.loadingStatus$;

    vm$ = combineLatest([this.loadingStatus$])
        .pipe(
            map(([loading]: [boolean]) => {
                if (loading) {
                    this.ngxSpinnerService.show();
                }
                else {
                    this.ngxSpinnerService.hide();
                }

                return { };
            })
        );

    constructor(private loadingService: LoadingService,
                private ngxSpinnerService: NgxSpinnerService) { }

}
