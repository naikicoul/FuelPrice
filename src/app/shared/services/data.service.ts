import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as JSZip from 'jszip';
import * as xml2js from 'xml2js';

import { pdv_request } from '../models/pdv_request';
import { urls } from '../assets/urls';
import { UtilsService } from '../services/utils.service';
import { StoreService } from '../services/store.service';
import { DisplayManagementService } from '../services/display-management.service';
import { LoadingService } from './loading.service';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    getPricesByDay(day: string) {
        this.displayManagementService.onDataRetrieved(false);
        this.loadingService.startLoading();

        this.getDataByDay(day)
            .subscribe((data: any) => {
                this.processData(data);
            },
            (error) => {
                console.error(error);
                this.loadingService.stopLoading();
                // throw error;
            });
    }

    getPricesToday() {
        this.displayManagementService.onDataRetrieved(false);
        this.loadingService.startLoading();

        this.getDataToday()
            .subscribe((data: any) => {
                this.processData(data);
            },
            (error) => {
                console.error(error);
                this.loadingService.stopLoading();
                // throw error;
            });
    }

    getPricesByYear(year: string) {
        this.displayManagementService.onDataRetrieved(false);
        this.loadingService.startLoading();

        this.getDataByYear(year)
            .subscribe((data: any) => {
                this.processData(data, true);
            },
            (error) => {
                console.error(error);
                this.loadingService.stopLoading();
                // throw error;
            });
    }

    // day format YYYYMMDD
    private getDataByDay(day: string) {
        return this.http.get(`${urls.apiUrl}/${urls.data_day}/${day}`, { responseType: 'blob' });
    }

    private getDataToday() {
        return this.http.get(`${urls.apiUrl}/${urls.data_now}`, { responseType: 'blob' });
    }

    private getDataByYear(year: string) {
        return this.http.get(`${urls.apiUrl}/${urls.data_year}/${year}`, { responseType: 'blob' });
    }

    private processData(data, isYearFormat: boolean = false) {
        const jsZip = new JSZip();
        jsZip.loadAsync(data).then((zip) => {
            Object.keys(zip.files).forEach((fileName) => {
                zip.files[fileName].async('text').then((fileData: string) => {
                    xml2js.parseString(fileData, { mergeAttrs: true, strict: false, normalizeTags: true, normalize: true }, (err, result) => {
                        if (err) {
                            console.error(err);
                            throw err;
                        }

                        this.storeService.data = [];

                        const temp = this.utilsService.filterResults(result.pdv_liste.pdv);

                        temp.map((pdv_request: pdv_request) => {
                            this.storeService.data.push(this.utilsService.mapPDV_RequestToPDV(pdv_request, isYearFormat));
                        });

                        console.log('this.storeService.data', this.storeService.data);

                        this.displayManagementService.onDataRetrieved(true);
                        this.loadingService.stopLoading();
                    });
                })
            })
        });
    }

    constructor(private http: HttpClient,
                private utilsService: UtilsService,
                private storeService: StoreService,
                private displayManagementService: DisplayManagementService,
                private loadingService: LoadingService) { }

}
