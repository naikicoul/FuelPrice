import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

import * as decompressResponse from 'decompress-response';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    day: string;

    getData() {
        this.dataService.getDataByDay(this.day)
            .subscribe((data: any) => {
                console.log('data', data);
                decompressResponse(data);
            });
    }

    constructor(private dataService: DataService) {
        this.day = '20210225';
    }

}
