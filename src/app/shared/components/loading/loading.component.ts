import { Component } from '@angular/core';

import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoadingService } from '../../services/loading.service';

@Component({
    selector: 'loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

    loadingStatus$ = this.loadingService.loadingStatus$;

    vm$ = combineLatest([this.loadingStatus$])
        .pipe(
            map(([loading]: [boolean]) => {
                return { loading };
            })
        );

    constructor(private loadingService: LoadingService) { }

}
