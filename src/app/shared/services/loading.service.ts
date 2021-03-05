import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    private _loading: boolean = false;
    private loadingStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    readonly loadingStatus$ = this.loadingStatus.asObservable();

    get loading():boolean {
        return this._loading;
    }

    set loading(value) {
        this._loading = value;
        this.loadingStatus.next(value);
    }

    startLoading() {
        this.loading = true;
    }

    stopLoading() {
        this.loading = false;
    }

}
