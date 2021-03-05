import { Component } from '@angular/core';

import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

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
                return { loading };
            })
        );

    constructor(private loadingService: LoadingService) { }

}
