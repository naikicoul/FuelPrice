import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { urls } from '../assets/urls';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    // day format YYYYMMDD
    getDataByDay(day: string) {
        return this.http.get(`${urls.apiUrl}/opendata/jour/${day}`);
    }

    // , { responseType: 'blob' }S

    constructor(private http: HttpClient) { }

}
