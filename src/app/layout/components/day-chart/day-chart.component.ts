import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { IChartistData, ILineChartOptions } from 'chartist';
import * as Chartist from 'chartist';
import * as ctPointLabels from 'chartist-plugin-pointlabels';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { DisplayManagementService } from 'src/app/shared/services/display-management.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { pdv } from 'src/app/shared/models/pdv';
import { Events } from 'src/app/shared/models/events';

@AutoUnsubscribe()
@Component({
    selector: 'day-chart',
    templateUrl: './day-chart.component.html',
    styleUrls: ['./day-chart.component.scss']
})
export class DayChartComponent implements AfterViewChecked, OnInit, OnDestroy {

    stations: Array<pdv> = [];
    isDataProcessed: boolean = false;
    displayChart: boolean = false;
    isChartDisplayed: boolean = false;

    dataProcessedEventSub: Subscription;

    data: IChartistData = {
        labels: [],
        series: []
    };

    options: ILineChartOptions = {
        axisX: {
            showLabel: true,
            showGrid: true
        },
        axisY: {
            showLabel: false
        },
        showLine: false,
        plugins: [
            ctPointLabels({
                textAnchor: 'middle',
                labelInterpolationFnc: Chartist.noop
            })
        ]
    };

    private processChart(isDataProcessed: boolean) {
        this.isDataProcessed = isDataProcessed;

        if (isDataProcessed) {
            this.displayChart = false;
            this.isChartDisplayed = false;
            this.stations = this.storeService.data;

            this.data.labels = [];
            this.data.series = [];

            const labels: Array<string> = [];
            const series: Array<number> = [];

            this.stations.map((station: pdv) => {
                labels.push(station.ville);
                series.push(station.prix as number);
            });

            this.data.labels = [...labels];
            this.data.series = [[...series]];
            this.displayChart = true;
        }
    }

    ngAfterViewChecked() {
        if (this.isDataProcessed && this.displayChart && !this.isChartDisplayed) {
            new Chartist.Line('.ct-chart', this.data, this.options);
            this.isChartDisplayed = true;
        }
    }

    ngOnInit() {
        this.dataProcessedEventSub = this.displayManagementService.on(Events.DataProcessed, (isDataProcessed: boolean) => { this.processChart(isDataProcessed); });
    }

    ngOnDestroy() { }

    constructor(private displayManagementService: DisplayManagementService,
                private storeService: StoreService) { }

}
