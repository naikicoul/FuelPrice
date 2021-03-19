import { Component, AfterViewChecked, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { IChartistData, ILineChartOptions } from 'chartist';
import * as Chartist from 'chartist';
import { format } from 'date-fns';
import * as legend from 'chartist-plugin-legend';

import { DisplayManagementService } from 'src/app/shared/services/display-management.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { pdv } from 'src/app/shared/models/pdv';
import { Events } from 'src/app/shared/models/events';

@AutoUnsubscribe()
@Component({
    selector: 'year-chart',
    templateUrl: './year-chart.component.html',
    styleUrls: ['./year-chart.component.scss']
})
export class YearChartComponent implements AfterViewChecked, OnInit, OnDestroy {

    stations: Array<pdv> = [];
    isDataProcessed: boolean = false;
    displayChart: boolean = false;
    isChartDisplayed: boolean = false;

    dataProcessedEventSub: Subscription;

    data: IChartistData = { series: [] };
    legends: Array<string> = [];

    options: ILineChartOptions = {
        axisX: {
            type: Chartist.FixedScaleAxis,
            divisor: ((new Date()).getMonth() + 1) * 4,
            labelInterpolationFnc: (value) => { return format(value, 'dd/MM') },
            scaleMinSpace: 20,
            showGrid: true
        },
        height: 300,
        showLine: true,
        lineSmooth: true,
        fullWidth: true,
        chartPadding: {
            right: 20
        },
        plugins: [
            legend({position: 'bottom'})
        ]
    };

    private processChart(isDataProcessed: boolean) {
        this.isDataProcessed = isDataProcessed;

        if (this.isDataProcessed) {
            this.displayChart = false;
            this.isChartDisplayed = false;
            this.stations = this.storeService.data;

            this.stations.map((station: pdv) => {
                const serie: any = {
                    name: station.ville,
                    data: []
                };

                this.legends.push(station.ville);

                const length: number = (station.prix as Array<number>).length;
                for (let i = 0; i < length; i++) {
                    serie.data.push({
                        x: new Date(station.maj[i]),
                        y: station.prix[i]
                    });
                }

                this.data.series.push(serie);
            });

            this.displayChart = true;
        }
    }

    ngOnInit() {
        this.dataProcessedEventSub = this.displayManagementService.on(Events.DataProcessed, (isDataProcessed: boolean) => { this.processChart(isDataProcessed); });
    }

    ngAfterViewChecked() {
        if (this.isDataProcessed && this.displayChart && !this.isChartDisplayed) {
            new Chartist.Line('.ct-chart', this.data, this.options);
            this.isChartDisplayed = true;
        }
    }

    ngOnDestroy() { }

    constructor(private displayManagementService: DisplayManagementService,
                private storeService: StoreService) { }

}
