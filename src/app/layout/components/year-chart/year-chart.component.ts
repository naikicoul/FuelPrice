import { Component, AfterViewChecked } from '@angular/core';

import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { IChartistData, ILineChartOptions } from 'chartist';
import * as Chartist from 'chartist';
import { format } from 'date-fns';
import * as legend from 'chartist-plugin-legend';

import { DisplayManagementService } from 'src/app/shared/services/display-management.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { pdv } from 'src/app/shared/models/pdv';

@Component({
    selector: 'year-chart',
    templateUrl: './year-chart.component.html',
    styleUrls: ['./year-chart.component.scss']
})
export class YearChartComponent implements AfterViewChecked {

    stations: Array<pdv> = [];
    dataRetrieved: boolean = false;
    displayChart: boolean = false;
    isChartDisplayed: boolean = false;

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
            legend()
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
