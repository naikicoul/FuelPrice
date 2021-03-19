import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    day: string;
    year: string;

    getDataByDay() {
        if (this.day) {
            const day = this.day.split('-').join('');
            this.dataService.getPricesByDay(day);
            this.router.navigate(['oneDay']);
        }
    }

    getDataToday() {
        this.dataService.getPricesToday();
        this.router.navigate(['oneDay']);
    }

    getDataByYear() {
        this.dataService.getPricesByYear(this.year);
        this.router.navigate(['oneYear']);
    }

    constructor(private dataService: DataService,
                private router: Router) {
        this.year = '2021';
    }

}
