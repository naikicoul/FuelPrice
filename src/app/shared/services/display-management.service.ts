import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DisplayManagementService {

    private dataRetrieved: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    readonly dataRetrieved$ = this.dataRetrieved.asObservable();

    onDataRetrieved(isDataRetrieved: boolean) {
        this.dataRetrieved.next(isDataRetrieved);
    }

}
