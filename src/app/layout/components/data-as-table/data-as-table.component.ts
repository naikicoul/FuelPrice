import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { DisplayManagementService } from 'src/app/shared/services/display-management.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { pdv } from 'src/app/shared/models/pdv';
import { Events } from 'src/app/shared/models/events';

@AutoUnsubscribe()
@Component({
    selector: 'data-as-table',
    templateUrl: './data-as-table.component.html',
    styleUrls: ['./data-as-table.component.scss']
})
export class DataAsTableComponent implements OnInit, OnDestroy {

    stations: Array<pdv> = [];
    isDataProcessed: boolean = false;
    dataProcessedEventSub: Subscription;

    private processLocalData(isDataProcessed: boolean) {
        this.isDataProcessed = isDataProcessed;
        if (isDataProcessed) {
            this.stations = this.storeService.data;
            // console.log('this.stations', this.stations);
        }
    }

    ngOnInit() {
        this.dataProcessedEventSub = this.displayManagementService.on(Events.DataProcessed, (isDataProcessed: boolean) => { this.processLocalData(isDataProcessed); });
    }

    ngOnDestroy() { }

    constructor(private displayManagementService: DisplayManagementService,
                private storeService: StoreService) { }

}
