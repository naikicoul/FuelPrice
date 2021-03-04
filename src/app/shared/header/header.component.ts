import { Component } from '@angular/core';

import * as JSZip from 'jszip';
import * as xml2js from 'xml2js';

import { pdv_request } from '../models/pdv_request';

import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { StoreService } from '../services/store.service';
import { DisplayManagementService } from '../services/display-management.service';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    day: string;

    getData() {
        // TODO : encapsulate call in a service ?
        this.displayManagementService.onDataRetrieved(false);

        this.dataService.getDataByDay(this.day)
        // this.dataService.getData()
            .subscribe((data: any) => {
                // console.log('data', data);
                const jsZip = new JSZip();
                    jsZip.loadAsync(data).then((zip) => {
                        Object.keys(zip.files).forEach((fileName) => {
                            zip.files[fileName].async('text').then((fileData: string) => {
                                // console.log('fileData', fileData);
                                xml2js.parseString(fileData, { mergeAttrs: true, strict: false, normalizeTags: true, normalize: true }, (err, result) => {
                                    // console.log('err', err);
                                    // console.log('result', result.pdv_liste.pdv[0]);

                                    this.storeService.data = [];

                                    const temp = this.utilsService.filterResults(result.pdv_liste.pdv);

                                    temp.map((pdv_request: pdv_request) => {
                                        this.storeService.data.push(this.utilsService.mapPDV_RequestToPDV(pdv_request));
                                    });

                                    this.displayManagementService.onDataRetrieved(true);
                                });
                            })
                        })
                    });

            });
    }

    constructor(private dataService: DataService,
                private utilsService: UtilsService,
                private storeService: StoreService,
                private displayManagementService: DisplayManagementService) {
        this.day = '20210225';
    }

}
