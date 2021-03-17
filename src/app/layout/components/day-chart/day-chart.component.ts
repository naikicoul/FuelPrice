import { AfterViewChecked, Component } from '@angular/core';

import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { IChartistData, ILineChartOptions } from 'chartist';
import * as Chartist from 'chartist';
import * as ctPointLabels from 'chartist-plugin-pointlabels';

import { DisplayManagementService } from 'src/app/shared/services/display-management.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { pdv } from 'src/app/shared/models/pdv';

@Component({
    selector: 'day-chart',
    templateUrl: './day-chart.component.html',
    styleUrls: ['./day-chart.component.scss']
})
export class DayChartComponent implements AfterViewChecked {

    stations: Array<pdv> = [];
    dataRetrieved: boolean = false;
    displayChart: boolean = false;
    isChartDisplayed: boolean = false;

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

    dataRetrieved$ = this.displayManagementService.dataRetrieved$;

    vm$ = combineLatest([this.dataRetrieved$])
        .pipe(
            map(([dataRetrieved]: [boolean]) => {
                this.dataRetrieved = dataRetrieved;

                if (dataRetrieved) {
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

                return { };
            })
        );

    ngAfterViewChecked() {
        if (this.dataRetrieved && this.displayChart && !this.isChartDisplayed) {
            new Chartist.Line('.ct-chart', this.data, this.options);
            this.isChartDisplayed = true;
        }
    }

    constructor(private displayManagementService: DisplayManagementService,
                private storeService: StoreService) { }

}
