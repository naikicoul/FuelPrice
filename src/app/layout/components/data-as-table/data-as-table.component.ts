import { Component } from '@angular/core';

import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { DisplayManagementService } from 'src/app/shared/services/display-management.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { pdv } from 'src/app/shared/models/pdv';

@Component({
    selector: 'data-as-table',
    templateUrl: './data-as-table.component.html',
    styleUrls: ['./data-as-table.component.scss']
})
export class DataAsTableComponent {

    stations: Array<pdv> = [];

    dataRetrieved$ = this.displayManagementService.dataRetrieved$;

    vm$ = combineLatest([this.dataRetrieved$])
        .pipe(
            map(([dataRetrieved]: [boolean]) => {
                if (dataRetrieved) {
                    this.stations = this.storeService.data;
                    // console.log('this.stations', this.stations);
                }

                return { dataRetrieved };
            })
        );

    constructor(private displayManagementService: DisplayManagementService,
                private storeService: StoreService) { }

}
