import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { EmitEvent } from '../models/emit_event';
import { Events } from '../models/events';

@Injectable({
    providedIn: 'root'
})
export class DisplayManagementService {

    private subject$ = new Subject<EmitEvent>();

    emit(event: EmitEvent) {
        this.subject$.next(event);
    }

    // Reminder : filter here emits the value that meets the condition,
    // meaning, we filter/look for an event to return it.

    on(event: Events, action: any): Subscription {
        return this.subject$.pipe(
            filter((e: EmitEvent) => e.name === event),
            map((e: EmitEvent) => e.value)
        ).subscribe(action);
    }

    // private dataRetrieved: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    // readonly dataRetrieved$ = this.dataRetrieved.asObservable();

    // onDataRetrieved(isDataRetrieved: boolean) {
    //     this.dataRetrieved.next(isDataRetrieved);
    // }

}
