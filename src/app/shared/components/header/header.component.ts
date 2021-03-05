import { Component } from '@angular/core';

import { DataService } from '../../services/data.service';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    day: string;

    getDataByDay() {
        this.dataService.getPricesbyDay(this.day);
    }

    getDataToday() {
        this.dataService.getPricesToday();
    }

    constructor(private dataService: DataService) {
        this.day = '20210225';
    }

}
